""" Chat services """

# import Chat from models
import os
import uuid
import json
from dotenv import load_dotenv
from typing import Sequence, List
from django.forms.models import model_to_dict
from langchain_google_genai import GoogleGenerativeAI
from langchain_core.output_parsers import StrOutputParser
from langchain_core.output_parsers.json import JsonOutputParser
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.chat_history import BaseChatMessageHistory
from langchain_core.messages import BaseMessage, SystemMessage, AIMessage, ChatMessage, message_to_dict, messages_from_dict
from langchain_core.runnables.history import RunnableWithMessageHistory
from .models import Message, Chat

# Load environment variables
load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
DEFAULT_SYSTEM_PROMPT = os.getenv("DEFAULT_SYSTEM_PROMPT")

class InPowerChatMessageHistory(BaseChatMessageHistory):
    """ Simple chat memory class """

    def __init__(self, chat: Chat):
        self._session_id = chat.chat_id
        self._chat = chat

    def add_messages(self, messages: Sequence[BaseMessage]) -> List[str]:
        """ Adds messages to chat message history """

        # Convert messages to a list of tuples
        values = [
          (str(uuid.uuid4()), self._chat, json.dumps(message_to_dict(message)))
          for message in messages
        ]

        # Add messages to the chat
        Message.objects.bulk_create(
            [Message(message_id=message_id, chat_id=chat_id, message=message) for message_id, chat_id, message in values]
        )

        # Return the list of messageIds for the messages
        return [message_id for message_id, _, _ in values]

    def get_messages(self) -> List[BaseMessage]:
        """Retrieves messages from the chat message history."""
        if not self._session_id:
            self._session_id = session_id

        queryset = Message.objects.filter(chat_id=self._session_id)
        items = [model_to_dict(instance) for instance in queryset]
        messages = messages_from_dict([json.loads(item["message"]) for item in items])
        return messages

    @property
    def messages(self) -> List[BaseMessage]:
        """Required property to get messages from the chat message history."""
        return self.get_messages()

    def clear(self) -> None:
        """Clears the chat message history."""
        Message.objects.filter(chat_id=self._session_id).delete()

class ContinuousChatService:
    """ Chat service class """
    chat_history: InPowerChatMessageHistory

    """ Chat service class """
    def __init__(self, chat, system_prompt: str = DEFAULT_SYSTEM_PROMPT):
        print("system_prompt: ", system_prompt)
        self.chat_history = InPowerChatMessageHistory(chat)
        model = GoogleGenerativeAI(model="gemini-pro", google_api_key=GOOGLE_API_KEY)
        prompt = ChatPromptTemplate.from_messages(
            [
                ("system", system_prompt),
                MessagesPlaceholder(variable_name="history"),
                ("human", "{input}"),
            ]
        )
        self.chain = prompt | model

    def get_message_history(self, session_id: str) -> InPowerChatMessageHistory:
        """ Gets the message history for a specific chat """
        return self.chat_history

    def trim_gemini_response(self, response: str) -> str:
        possible_prefixes = ["Assistant: ", "System: ", "ai: ", "user: "]
        for prefix in possible_prefixes:
            if response.startswith(prefix):
                return response[len(prefix):]
        return response

    def send_message(self, content: str) -> str:
        """ Sends a message to the chat """
        chat_history_messages = self.chat_history.get_messages()
        response = self.chain.invoke(
            {
                "history": chat_history_messages,
                "input": content,
            }
        )

        # Cast response to ai message type
        user_message = ChatMessage(role="user", content=content)
        ai_message = ChatMessage(role="ai", content=self.trim_gemini_response(response))

        print("after recasting to AI: ", ai_message)

        messageIds = self.chat_history.add_messages([user_message, ai_message])

        # Get the newly created messages by Id
        messages = Message.objects.filter(message_id__in=messageIds)
        # Convert messages to a list of tuples
        messages = [model_to_dict(instance) for instance in messages]

        return messages

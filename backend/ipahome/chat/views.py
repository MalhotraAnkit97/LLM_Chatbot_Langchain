"""Views for the chat application."""

import uuid
import json
from django.http import JsonResponse
from django.forms.models import model_to_dict
from django.views.decorators.csrf import csrf_exempt
from .models import Chat, Message, User
from .services import ContinuousChatService, InPowerChatMessageHistory

@csrf_exempt
def chats(request):
    """ Gets all chats in the system """
    if request.method == 'GET':
        # Get all chats
        queryset = Chat.objects.all()
        list_of_chats = [model_to_dict(instance) for instance in queryset]
        return JsonResponse({"chats": list_of_chats})

@csrf_exempt
def chat(request, chat_id):
    """ Gets a specific chat with the given ID. """
    if request.method == 'GET':
        queryset = Chat.objects.get(chat_id=chat_id)
        if not chat:
            return JsonResponse({"message": "Chat not found."}, status=404)
        return JsonResponse({"chat": model_to_dict(queryset)})

@csrf_exempt
def chat_messages(request, chat_id):
    """ Can get and post messages for a specific chat. """
    if request.method == "GET":
        # Get all messages for a specific chat
        queryset = Message.objects.filter(chat_id=chat_id)
        messages = [model_to_dict(instance) for instance in queryset]
        return JsonResponse({"messages": messages})

    if request.method == "POST":
        # Get chat from the database
        chat = Chat.objects.get(chat_id=chat_id)
        if not chat:
            return JsonResponse({"message": "Chat not found."}, status=404)

        # Get message from the request body
        message = request.POST.get("message")
        if not message:
            return JsonResponse({"error": "Message is a required parameter."}, status=400)

        chat_kwargs = {
            "chat": chat
        }
        system_prompt = request.POST.get("system_prompt")
        if system_prompt:
            chat_kwargs["system_prompt"] = system_prompt

        # Talk to the model
        chat_model = ContinuousChatService(**chat_kwargs)
        messages = chat_model.send_message(message)

        messages_list = [mapChatMessageToSimpleDict(instance) for instance in messages]
        return JsonResponse({"messages": messages_list}, status=201)

@csrf_exempt
def users(request):
    """ Gets all users in the system. Can create a user. """
    if request.method == "POST":
        # Generate a new user ID
        user_id = uuid.uuid4()

        # Get name from request body
        name = request.POST.get("name")
        if not name:
            return JsonResponse({"error": "Name is a required parameter."}, status=400)

        # Create a new user
        user = User.objects.create(user_id=str(user_id), name=name)
        return JsonResponse({"user": model_to_dict(user)}, status=201)

    if request.method == "GET":
        # Get all users
        queryset = User.objects.all()
        users = [model_to_dict(instance) for instance in queryset]
        return JsonResponse({"users": users})

@csrf_exempt
def user(request, user_id):
    """ Gets the user profile for a specific user. """
    if request.method == "GET":
        user = User.objects.get(user_id=user_id)
        if not user:
            return JsonResponse({"error": "User not found."}, status=404)

        return JsonResponse({"user": model_to_dict(user)})

@csrf_exempt
def user_chats(request, user_id):
    """ Gets all chats of user. Creates a new chat for the user. """
    if request.method == "GET":
        queryset = Chat.objects.filter(user_id=user_id)
        chats = [model_to_dict(instance) for instance in queryset]
        return JsonResponse({"chats": chats})

    if request.method == "POST":
        # Get user from the database
        user = User.objects.get(user_id=user_id)
        if not user:
            return JsonResponse({"message": "User not found."}, status=404)

        # Get message from the request body
        message = request.POST.get("message")
        if not message:
            return JsonResponse({"error": "Message is a required parameter when starting a new chat."}, status=400)

        # Create a new chat object
        chat_id = str(uuid.uuid4())
        chat_object = Chat.objects.create(chat_id=chat_id, user_id=user, title="New Chat", summary="This is a new chat")

        chat_kwargs = {
            "chat": chat_object
        }
        system_prompt = request.POST.get("system_prompt")
        if system_prompt:
            chat_kwargs["system_prompt"] = system_prompt

        # Talk to the model
        chat_model = ContinuousChatService(**chat_kwargs)
        messages = chat_model.send_message(message)

        messages_list = [mapChatMessageToSimpleDict(instance) for instance in messages]
        return JsonResponse({"chatId": chat_id, "messages": messages_list}, status=201)

def mapChatMessageToSimpleDict(message):
    """ Maps a chat message to a simple dictionary. """

    message_json = message["message"]
    message_data = json.loads(message_json)["data"]

    return {
        "id": message["message_id"],
        "chatId": message["chat_id"],
        "role": message_data["role"],
        "content": message_data["content"],
        "createdAt": message["timestamp_start"],
    }

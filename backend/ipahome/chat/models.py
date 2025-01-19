""" Models for the chat app """

import enum
from django.db import models
from django.utils.timezone import now

class UserType(enum.Enum):
    """ Enum for the type of messenger """
    SYSTEM = "system"
    AI = "ai"
    USER = "user"
    HUMAN = "human"

class MessageStatus(enum.Enum):
    """ Enum for the status of the message """
    SENT = "sent"
    RECEIVED = "received"
    ERROR = "error"

class Chat(models.Model):
    """ Model for chat """
    chat_id = models.CharField(primary_key=True, max_length=36)
    title = models.CharField(max_length=150)
    summary = models.TextField()
    start_date = models.DateTimeField(default=now)
    user_id = models.ForeignKey('User', on_delete=models.CASCADE)

    def __str__(self):
        return str(self.title)

# Message
class Message(models.Model):
    """ Model for message that belongs to a chat """
    message_id = models.CharField(primary_key=True, max_length=36)
    message = models.JSONField()
    timestamp_start = models.DateTimeField(default=now)
    time_first_token_ms = models.IntegerField(null=True) # in milliseconds
    timestamp_end = models.DateTimeField(default=now)
    finish_date = models.DateTimeField(default=now)
    chat_id = models.ForeignKey('Chat', on_delete=models.CASCADE)
    user_type = models.CharField(max_length=10, choices=[(tag, tag.value) for tag in UserType])
    error = models.JSONField(null=True)
    status = models.CharField(max_length=10,
                              choices=[(tag, tag.value) for tag in MessageStatus],
                              default=MessageStatus.SENT)

    def __str__(self):
        return str(self.message)


# User
class User(models.Model):
    """ represents the user """
    user_id = models.CharField(primary_key=True, max_length=36)
    name = models.CharField(max_length=100)

    def __str__(self):
        return str(self.name)

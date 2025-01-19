"""URL patterns for the chat application."""

from dotenv import load_dotenv
from django.urls import path
from . import views

load_dotenv()

urlpatterns = [
    path('chats/', views.chats, name='chats'),
    path('chats/<str:chat_id>/', views.chat, name='chat'),
    path('chats/<str:chat_id>/messages/', views.chat_messages, name='chat_messages'),
    path('users/', views.users, name='users'),
    path('users/<str:user_id>/', views.user, name='user'),
    path('users/<str:user_id>/chats', views.user_chats, name='user_chats'),
]

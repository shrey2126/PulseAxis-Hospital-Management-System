from django.contrib import admin
from .models import ChatMessage

@admin.register(ChatMessage)
class ChatMessageAdmin(admin.ModelAdmin):
    list_display = ['message_type', 'content', 'timestamp', 'session_id']
    list_filter = ['message_type', 'timestamp']
    search_fields = ['content', 'session_id']
    readonly_fields = ['timestamp']
    ordering = ['-timestamp']

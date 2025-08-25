from django.urls import path
from .views import ChatbotView, ChatHistoryView

app_name = 'chatbot'

urlpatterns = [
    path('chat/', ChatbotView.as_view(), name='chat'),
    path('history/', ChatHistoryView.as_view(), name='history'),
]

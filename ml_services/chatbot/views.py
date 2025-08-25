from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
import google.generativeai as genai
import uuid
import json

from .models import ChatMessage
from .serializers import ChatRequestSerializer, ChatResponseSerializer, ChatMessageSerializer

# Configure Gemini API
genai.configure(api_key=settings.GEMINI_API_KEY)

class ChatbotView(APIView):
    def post(self, request):
        serializer = ChatRequestSerializer(data=request.data)
        if serializer.is_valid():
            user_message = serializer.validated_data['message']
            session_id = serializer.validated_data.get('session_id', str(uuid.uuid4()))
            
            try:
                # Generate response using Gemini
                # model = genai.GenerativeModel('gemini-pro')
                model = genai.GenerativeModel('gemini-1.5-flash')
                
                # Create context for hospital-related queries
                context = f"""
                You are a helpful AI assistant for a hospital management system. 
                You can help with:
                - General health information
                - Hospital services
                - Appointment scheduling guidance
                - Medical terminology explanations
                - Health tips and advice
                
                Please provide helpful, accurate, and professional responses.
                Keep responses concise but informative.
                
                User message: {user_message}
                """
                
                response = model.generate_content(context)
                bot_response = response.text
                
                # Save user message
                user_chat = ChatMessage.objects.create(
                    message_type='user',
                    content=user_message,
                    session_id=session_id
                )
                
                # Save bot response
                bot_chat = ChatMessage.objects.create(
                    message_type='bot',
                    content=bot_response,
                    session_id=session_id
                )
                
                return Response({
                    'response': bot_response,
                    'session_id': session_id,
                    'user_message_id': user_chat.id,
                    'bot_message_id': bot_chat.id
                }, status=status.HTTP_200_OK)
                
            except Exception as e:
                return Response({
                    'error': 'Failed to generate response',
                    'details': str(e)
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ChatHistoryView(APIView):
    def get(self, request):
        session_id = request.query_params.get('session_id')
        if not session_id:
            return Response({'error': 'session_id is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        messages = ChatMessage.objects.filter(session_id=session_id)
        serializer = ChatMessageSerializer(messages, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import uuid
import json

from .models import SymptomCheck, DiseasePrediction, TreatmentInfo
from .serializers import (
    SymptomCheckSerializer, SymptomCheckRequestSerializer,
    DiseasePredictionSerializer, DiseasePredictionRequestSerializer,
    TreatmentInfoSerializer, TreatmentInfoRequestSerializer
)

# Import our trained ML models
from .ml_inference import MLInferenceEngine

# Initialize ML inference engine
try:
    ml_engine = MLInferenceEngine()
except Exception:
    ml_engine = None

class SymptomCheckerView(APIView):
    def post(self, request):
        serializer = SymptomCheckRequestSerializer(data=request.data)
        if serializer.is_valid():
            symptoms = serializer.validated_data['symptoms']
            session_id = serializer.validated_data.get('session_id', str(uuid.uuid4()))
            
            try:
                if ml_engine is None:
                    return Response({'error': 'ML models not loaded. Train models first (python ml_models/train_models.py).'}, status=status.HTTP_503_SERVICE_UNAVAILABLE)
                # Use trained ML model to analyze symptoms
                ml_result = ml_engine.predict_symptoms(symptoms)
                
                if 'error' in ml_result:
                    return Response({
                        'error': 'ML model prediction failed',
                        'details': ml_result['error']
                    }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                
                # Format results from ML model
                conditions_text = "\n".join(ml_result['possible_conditions'])
                confidence_score = ml_result['confidence_score']
                
                # Save to database
                symptom_check = SymptomCheck.objects.create(
                    symptoms=symptoms,
                    possible_conditions=conditions_text,
                    confidence_score=confidence_score,
                    session_id=session_id
                )
                
                return Response({
                    'id': symptom_check.id,
                    'symptoms': symptoms,
                    'possible_conditions': conditions_text,
                    'confidence_score': confidence_score,
                    'session_id': session_id
                }, status=status.HTTP_200_OK)
                
            except Exception as e:
                return Response({
                    'error': 'Failed to analyze symptoms',
                    'details': str(e)
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DiseasePredictionView(APIView):
    def post(self, request):
        serializer = DiseasePredictionRequestSerializer(data=request.data)
        if serializer.is_valid():
            health_data = serializer.validated_data['health_data']
            session_id = serializer.validated_data.get('session_id', str(uuid.uuid4()))
            
            try:
                if ml_engine is None:
                    return Response({'error': 'ML models not loaded. Train models first (python ml_models/train_models.py).'}, status=status.HTTP_503_SERVICE_UNAVAILABLE)
                # Use trained ML model to predict disease
                ml_result = ml_engine.predict_disease(health_data)
                
                if 'error' in ml_result:
                    return Response({
                        'error': 'ML model prediction failed',
                        'details': ml_result['error']
                    }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                
                # Get results from ML model
                predicted_disease = ml_result['predicted_disease']
                risk_score = ml_result['risk_score']
                confidence_level = ml_result['confidence_level']
                
                # Save to database
                disease_prediction = DiseasePrediction.objects.create(
                    health_data=health_data,
                    predicted_disease=predicted_disease,
                    risk_score=risk_score,
                    confidence_level=confidence_level,
                    session_id=session_id
                )
                
                return Response({
                    'id': disease_prediction.id,
                    'health_data': health_data,
                    'predicted_disease': predicted_disease,
                    'risk_score': risk_score,
                    'confidence_level': confidence_level,
                    'session_id': session_id
                }, status=status.HTTP_200_OK)
                
            except Exception as e:
                return Response({
                    'error': 'Failed to predict disease',
                    'details': str(e)
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TreatmentInfoView(APIView):
    def post(self, request):
        serializer = TreatmentInfoRequestSerializer(data=request.data)
        if serializer.is_valid():
            disease_name = serializer.validated_data['disease_name']
            
            try:
                if ml_engine is None:
                    return Response({'error': 'ML models not loaded. Train models first (python ml_models/train_models.py).'}, status=status.HTTP_503_SERVICE_UNAVAILABLE)
                # Check if treatment info already exists
                existing_treatment = TreatmentInfo.objects.filter(
                    disease_name__iexact=disease_name
                ).first()
                
                if existing_treatment:
                    serializer = TreatmentInfoSerializer(existing_treatment)
                    return Response(serializer.data, status=status.HTTP_200_OK)
                
                # Use trained ML model to get treatment information
                ml_result = ml_engine.get_treatment_info(disease_name)
                
                if 'error' in ml_result:
                    return Response({
                        'error': 'ML model failed to get treatment info',
                        'details': ml_result['error']
                    }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                
                # Get results from ML model
                treatment_options = ml_result['treatment_options']
                medications = ml_result['medications']
                lifestyle_changes = ml_result['lifestyle_changes']
                precautions = ml_result['precautions']
                
                # Save to database
                treatment_info = TreatmentInfo.objects.create(
                    disease_name=disease_name,
                    treatment_options=treatment_options,
                    medications=medications,
                    lifestyle_changes=lifestyle_changes,
                    precautions=precautions
                )
                
                serializer = TreatmentInfoSerializer(treatment_info)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
                
            except Exception as e:
                return Response({
                    'error': 'Failed to generate treatment information',
                    'details': str(e)
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TreatmentInfoListView(APIView):
    def get(self, request):
        treatments = TreatmentInfo.objects.all()
        serializer = TreatmentInfoSerializer(treatments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

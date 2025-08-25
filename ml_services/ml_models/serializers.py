from rest_framework import serializers
from .models import SymptomCheck, DiseasePrediction, TreatmentInfo

class SymptomCheckSerializer(serializers.ModelSerializer):
    class Meta:
        model = SymptomCheck
        fields = ['id', 'symptoms', 'possible_conditions', 'confidence_score', 'timestamp', 'session_id']
        read_only_fields = ['id', 'timestamp', 'possible_conditions', 'confidence_score']

class SymptomCheckRequestSerializer(serializers.Serializer):
    symptoms = serializers.CharField(max_length=1000)
    session_id = serializers.CharField(max_length=100, required=False, allow_blank=True)

class DiseasePredictionSerializer(serializers.ModelSerializer):
    class Meta:
        model = DiseasePrediction
        fields = ['id', 'health_data', 'predicted_disease', 'risk_score', 'confidence_level', 'timestamp', 'session_id']
        read_only_fields = ['id', 'timestamp', 'predicted_disease', 'risk_score', 'confidence_level']

class DiseasePredictionRequestSerializer(serializers.Serializer):
    health_data = serializers.JSONField()
    session_id = serializers.CharField(max_length=100, required=False, allow_blank=True)

class TreatmentInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TreatmentInfo
        fields = ['id', 'disease_name', 'treatment_options', 'medications', 'lifestyle_changes', 'precautions', 'timestamp']

class TreatmentInfoRequestSerializer(serializers.Serializer):
    disease_name = serializers.CharField(max_length=200)

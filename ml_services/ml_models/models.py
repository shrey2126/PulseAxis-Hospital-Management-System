from django.db import models
from django.utils import timezone

class SymptomCheck(models.Model):
    symptoms = models.TextField()
    possible_conditions = models.TextField()
    confidence_score = models.FloatField(default=0.0)
    timestamp = models.DateTimeField(default=timezone.now)
    session_id = models.CharField(max_length=100, blank=True, null=True)
    
    class Meta:
        ordering = ['-timestamp']
    
    def __str__(self):
        return f"Symptom Check: {self.symptoms[:50]}..."

class DiseasePrediction(models.Model):
    health_data = models.JSONField()
    predicted_disease = models.CharField(max_length=200)
    risk_score = models.FloatField(default=0.0)
    confidence_level = models.CharField(max_length=50, default='Low')
    timestamp = models.DateTimeField(default=timezone.now)
    session_id = models.CharField(max_length=100, blank=True, null=True)
    
    class Meta:
        ordering = ['-timestamp']
    
    def __str__(self):
        return f"Disease Prediction: {self.predicted_disease}"

class TreatmentInfo(models.Model):
    disease_name = models.CharField(max_length=200)
    treatment_options = models.JSONField()
    medications = models.JSONField(default=list)
    lifestyle_changes = models.TextField(blank=True)
    precautions = models.TextField(blank=True)
    timestamp = models.DateTimeField(default=timezone.now)
    
    class Meta:
        ordering = ['disease_name']
    
    def __str__(self):
        return f"Treatment Info: {self.disease_name}"

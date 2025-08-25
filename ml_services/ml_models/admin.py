from django.contrib import admin
from .models import SymptomCheck, DiseasePrediction, TreatmentInfo

@admin.register(SymptomCheck)
class SymptomCheckAdmin(admin.ModelAdmin):
    list_display = ['symptoms', 'confidence_score', 'timestamp', 'session_id']
    list_filter = ['confidence_score', 'timestamp']
    search_fields = ['symptoms', 'possible_conditions']
    readonly_fields = ['timestamp']
    ordering = ['-timestamp']

@admin.register(DiseasePrediction)
class DiseasePredictionAdmin(admin.ModelAdmin):
    list_display = ['predicted_disease', 'risk_score', 'confidence_level', 'timestamp', 'session_id']
    list_filter = ['confidence_level', 'risk_score', 'timestamp']
    search_fields = ['predicted_disease']
    readonly_fields = ['timestamp']
    ordering = ['-timestamp']

@admin.register(TreatmentInfo)
class TreatmentInfoAdmin(admin.ModelAdmin):
    list_display = ['disease_name', 'timestamp']
    list_filter = ['timestamp']
    search_fields = ['disease_name']
    readonly_fields = ['timestamp']
    ordering = ['disease_name']

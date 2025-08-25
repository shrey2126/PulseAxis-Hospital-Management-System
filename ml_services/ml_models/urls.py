from django.urls import path
from .views import (
    SymptomCheckerView, DiseasePredictionView, 
    TreatmentInfoView, TreatmentInfoListView
)

app_name = 'ml_models'

urlpatterns = [
    path('symptom-checker/', SymptomCheckerView.as_view(), name='symptom_checker'),
    path('disease-prediction/', DiseasePredictionView.as_view(), name='disease_prediction'),
    path('treatment-info/', TreatmentInfoView.as_view(), name='treatment_info'),
    path('treatment-list/', TreatmentInfoListView.as_view(), name='treatment_list'),
]

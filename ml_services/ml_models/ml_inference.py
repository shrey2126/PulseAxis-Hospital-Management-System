#!/usr/bin/env python3
"""
ML Model Inference Engine for Hospital Management System
Loads trained models and provides prediction services
"""

import pickle
import json
import os
import numpy as np
from typing import Dict, List, Any, Tuple

class MLInferenceEngine:
    def __init__(self, models_dir=None):
        self.models_dir = models_dir
        self.models = {}
        self.vectorizers = {}
        self.encoders = {}
        self.scalers = {}
        self.treatment_data = None
        
        # Load all trained models
        self.load_models()
    
    def load_models(self):
        """Load all trained models from disk"""
        print("🔄 Loading trained ML models...")
        # Resolve default path to be within this app directory
        if not self.models_dir:
            self.models_dir = os.path.join(os.path.dirname(__file__), 'trained_models')
        
        try:
            # Load Symptom Checker
            with open(f'{self.models_dir}/symptom_checker.pkl', 'rb') as f:
                symptom_data = pickle.load(f)
                self.models['symptom_checker'] = symptom_data['model']
                self.vectorizers['symptom_checker'] = symptom_data['vectorizer']
                self.encoders['symptom_checker'] = symptom_data['encoder']
            
            # Load Disease Prediction
            with open(f'{self.models_dir}/disease_prediction.pkl', 'rb') as f:
                disease_data = pickle.load(f)
                self.models['disease_prediction'] = disease_data['models']
                self.scalers['disease_prediction'] = disease_data['scaler']
                self.encoders['disease_prediction'] = disease_data['encoder']
            
            # Load Treatment Recommendation
            with open(f'{self.models_dir}/treatment_recommendation.pkl', 'rb') as f:
                self.treatment_data = pickle.load(f)
            
            print("✅ All ML models loaded successfully!")
            
        except FileNotFoundError:
            print("❌ Trained models not found! Please run train_models.py first.")
            print("💡 Run: python train_models.py")
            return False
        
        return True
    
    def predict_symptoms(self, symptoms: str) -> Dict[str, Any]:
        """Predict possible diseases from symptoms"""
        if 'symptom_checker' not in self.models:
            return {'error': 'Symptom checker model not loaded'}
        
        try:
            # Vectorize symptoms
            symptoms_vectorized = self.vectorizers['symptom_checker'].transform([symptoms])
            
            # Make prediction
            prediction = self.models['symptom_checker'].predict(symptoms_vectorized)[0]
            prediction_proba = self.models['symptom_checker'].predict_proba(symptoms_vectorized)[0]
            
            # Decode prediction
            predicted_disease = self.encoders['symptom_checker'].inverse_transform([prediction])[0]
            
            # Get confidence score
            confidence_score = max(prediction_proba) * 100
            
            # Get top 3 possible conditions
            top_indices = np.argsort(prediction_proba)[-3:][::-1]
            possible_conditions = []
            for idx in top_indices:
                disease = self.encoders['symptom_checker'].inverse_transform([idx])[0]
                confidence = prediction_proba[idx] * 100
                possible_conditions.append(f"{disease} ({confidence:.1f}%)")
            
            return {
                'symptoms': symptoms,
                'predicted_disease': predicted_disease,
                'possible_conditions': possible_conditions,
                'confidence_score': confidence_score,
                'model_type': 'RandomForest Classifier',
                'features_used': 'TF-IDF vectorized symptoms'
            }
            
        except Exception as e:
            return {'error': f'Prediction failed: {str(e)}'}
    
    def predict_disease(self, health_data: Dict[str, Any]) -> Dict[str, Any]:
        """Predict disease risk from health data"""
        if 'disease_prediction' not in self.models:
            return {'error': 'Disease prediction model not loaded'}
        
        try:
            # Extract features
            features = [
                float(health_data.get('age', 30)),
                float(health_data.get('bloodPressure', 120)),
                float(health_data.get('heartRate', 70)),
                float(health_data.get('temperature', 98.6)),
                float(health_data.get('weight', 70)),
                float(health_data.get('height', 170))
            ]
            
            # Calculate BMI
            height_m = features[5] / 100
            bmi = features[4] / (height_m ** 2)
            features.append(bmi)
            
            # Scale features
            features_scaled = self.scalers['disease_prediction'].transform([features])
            
            # Make predictions with both models
            rf_prediction = self.models['disease_prediction']['random_forest'].predict(features_scaled)[0]
            xgb_prediction = self.models['disease_prediction']['xgboost'].predict(features_scaled)[0]
            
            # Get probabilities
            rf_proba = self.models['disease_prediction']['random_forest'].predict_proba(features_scaled)[0]
            xgb_proba = self.models['disease_prediction']['xgboost'].predict_proba(features_scaled)[0]
            
            # Decode predictions
            rf_disease = self.encoders['disease_prediction'].inverse_transform([rf_prediction])[0]
            xgb_disease = self.encoders['disease_prediction'].inverse_transform([xgb_prediction])[0]
            
            # Ensemble decision (majority vote)
            if rf_disease == xgb_disease:
                final_disease = rf_disease
                final_confidence = (max(rf_proba) + max(xgb_proba)) / 2
            else:
                # Choose the one with higher confidence
                rf_conf = max(rf_proba)
                xgb_conf = max(xgb_proba)
                if rf_conf > xgb_conf:
                    final_disease = rf_disease
                    final_confidence = rf_conf
                else:
                    final_disease = xgb_disease
                    final_confidence = xgb_conf
            
            # Calculate risk score based on health data
            risk_factors = 0
            if features[1] > 140:  # High BP
                risk_factors += 1
            if features[2] > 90:   # High HR
                risk_factors += 1
            if features[3] > 100.4:  # Fever
                risk_factors += 1
            if bmi > 30:  # Obesity
                risk_factors += 1
            
            risk_score = min(risk_factors * 25, 100)
            
            # Determine confidence level
            if final_confidence > 0.8:
                confidence_level = 'High'
            elif final_confidence > 0.6:
                confidence_level = 'Medium'
            else:
                confidence_level = 'Low'
            
            return {
                'health_data': health_data,
                'predicted_disease': final_disease,
                'risk_score': risk_score,
                'confidence_level': confidence_level,
                'model_confidence': final_confidence * 100,
                'model_type': 'Ensemble (RandomForest + XGBoost)',
                'features_used': 'Age, BP, HR, Temp, Weight, Height, BMI',
                'risk_factors_identified': risk_factors
            }
            
        except Exception as e:
            return {'error': f'Disease prediction failed: {str(e)}'}
    
    def get_treatment_info(self, disease_name: str) -> Dict[str, Any]:
        """Get treatment recommendations for a disease"""
        if self.treatment_data is None:
            return {'error': 'Treatment recommendation model not loaded'}
        
        try:
            # Search for exact match
            exact_match = self.treatment_data[self.treatment_data['disease'].str.lower() == disease_name.lower()]
            
            if len(exact_match) > 0:
                row = exact_match.iloc[0]
                return {
                    'disease_name': row['disease'],
                    'treatment_options': row['treatments'],
                    'medications': row['medications'],
                    'lifestyle_changes': row['lifestyle_changes'],
                    'precautions': row['precautions'],
                    'model_type': 'Rule-based Medical Knowledge Base',
                    'source': 'Trained Medical ML Model'
                }
            
            # Search for partial matches
            partial_matches = self.treatment_data[
                self.treatment_data['disease'].str.lower().str.contains(disease_name.lower())
            ]
            
            if len(partial_matches) > 0:
                # Return the first partial match
                row = partial_matches.iloc[0]
                return {
                    'disease_name': row['disease'],
                    'treatment_options': row['treatments'],
                    'medications': row['medications'],
                    'lifestyle_changes': row['lifestyle_changes'],
                    'precautions': row['precautions'],
                    'model_type': 'Rule-based Medical Knowledge Base',
                    'source': 'Trained Medical ML Model',
                    'note': 'Partial match found'
                }
            
            # No match found
            return {
                'disease_name': disease_name,
                'error': 'Disease not found in our database',
                'suggestion': 'Please check spelling or consult a healthcare professional',
                'available_diseases': self.treatment_data['disease'].tolist()
            }
            
        except Exception as e:
            return {'error': f'Treatment recommendation failed: {str(e)}'}
    
    def get_model_info(self) -> Dict[str, Any]:
        """Get information about loaded models"""
        try:
            with open(f'{self.models_dir}/model_info.json', 'r') as f:
                model_info = json.load(f)
            
            return {
                'models_loaded': len(self.models),
                'model_details': model_info,
                'models_directory': self.models_dir
            }
        except FileNotFoundError:
            return {'error': 'Model info file not found'}
    
    def health_check(self) -> Dict[str, Any]:
        """Check if all models are loaded and working"""
        models_status = {}
        
        # Check symptom checker
        if 'symptom_checker' in self.models:
            models_status['symptom_checker'] = '✅ Loaded'
        else:
            models_status['symptom_checker'] = '❌ Not Loaded'
        
        # Check disease prediction
        if 'disease_prediction' in self.models:
            models_status['disease_prediction'] = '✅ Loaded'
        else:
            models_status['disease_prediction'] = '❌ Not Loaded'
        
        # Check treatment recommendation
        if self.treatment_data is not None:
            models_status['treatment_recommendation'] = '✅ Loaded'
        else:
            models_status['treatment_recommendation'] = '❌ Not Loaded'
        
        return {
            'status': 'healthy' if all('✅' in status for status in models_status.values()) else 'unhealthy',
            'models': models_status,
            'total_models': len(models_status)
        }

def main():
    """Test the ML inference engine"""
    print("🧠 Testing ML Inference Engine...")
    
    # Initialize engine
    engine = MLInferenceEngine()
    
    # Health check
    health = engine.health_check()
    print(f"Health Status: {health['status']}")
    
    # Test symptom checker
    print("\n🔍 Testing Symptom Checker:")
    symptom_result = engine.predict_symptoms("fever, headache, fatigue")
    print(json.dumps(symptom_result, indent=2))
    
    # Test disease prediction
    print("\n📊 Testing Disease Prediction:")
    disease_result = engine.predict_disease({
        'age': 45,
        'bloodPressure': 150,
        'heartRate': 85,
        'temperature': 98.6,
        'weight': 80,
        'height': 175
    })
    print(json.dumps(disease_result, indent=2))
    
    # Test treatment recommendation
    print("\n💊 Testing Treatment Recommendation:")
    treatment_result = engine.get_treatment_info("Hypertension")
    print(json.dumps(treatment_result, indent=2))

if __name__ == "__main__":
    main()

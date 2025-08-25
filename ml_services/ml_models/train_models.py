#!/usr/bin/env python3
"""
ML Model Training Script for Hospital Management System
Trains three models: Symptom Checker, Disease Prediction, and Treatment Recommendation
"""

import pandas as pd
import numpy as np
import pickle
import json
import os
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.multioutput import MultiOutputClassifier
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.metrics import classification_report, accuracy_score
import xgboost as xgb
from sklearn.neural_network import MLPClassifier
import warnings
warnings.filterwarnings('ignore')

class MedicalMLTrainer:
    def __init__(self):
        self.models = {}
        self.vectorizers = {}
        self.encoders = {}
        self.scalers = {}
        
    def generate_synthetic_medical_data(self):
            print("🏥 Generating synthetic medical data...")
            
            # Expanded Symptom-Disease mapping with more conditions
            symptom_disease_data = {
                'fever': ['Common Cold', 'Flu', 'COVID-19', 'Pneumonia', 'Malaria', 'Dengue', 'UTI', 'Sinusitis'],
                'headache': ['Migraine', 'Tension Headache', 'Sinusitis', 'Hypertension', 'Cluster Headache', 'Concussion'],
                'cough': ['Common Cold', 'Bronchitis', 'Pneumonia', 'Asthma', 'Tuberculosis', 'Allergies', 'GERD'],
                'fatigue': ['Anemia', 'Depression', 'Chronic Fatigue', 'Diabetes', 'Hypothyroidism', 'Sleep Apnea'],
                'chest_pain': ['Angina', 'Heart Attack', 'Pneumonia', 'Anxiety', 'GERD', 'Costochondritis'],
                'shortness_of_breath': ['Asthma', 'Pneumonia', 'Heart Failure', 'Anxiety', 'COPD', 'Anemia'],
                'nausea': ['Gastritis', 'Food Poisoning', 'Migraine', 'Pregnancy', 'Vertigo', 'Medication Reaction'],
                'abdominal_pain': ['Appendicitis', 'Gastritis', 'Ulcer', 'Gallstones', 'IBS', 'Constipation'],
                'joint_pain': ['Arthritis', 'Lupus', 'Fibromyalgia', 'Injury', 'Gout', 'Bursitis'],
                'dizziness': ['Vertigo', 'Low Blood Pressure', 'Anemia', 'Anxiety', 'Dehydration', 'Hypoglycemia'],
                'rash': ['Allergy', 'Eczema', 'Psoriasis', 'Contact Dermatitis', 'Measles'],
                'sore_throat': ['Strep Throat', 'Common Cold', 'Tonsillitis', 'Allergies', 'COVID-19'],
                'back_pain': ['Muscle Strain', 'Herniated Disc', 'Kidney Stones', 'Arthritis', 'Poor Posture'],
                'diarrhea': ['Food Poisoning', 'Viral Infection', 'IBS', 'Celiac Disease', 'Medication Side Effect'],
                'constipation': ['Dehydration', 'IBS', 'Hypothyroidism', 'Colon Cancer', 'Neurological Disorders'],
                'vomiting': ['Food Poisoning', 'Migraine', 'Pregnancy', 'Concussion', 'Stomach Flu'],
                'swelling': ['Edema', 'Allergic Reaction', 'Infection', 'Kidney Disease', 'Heart Failure']
            }
            
            # Generate training data with more combinations
            symptoms_list = []
            diseases_list = []
            
            for symptom, diseases in symptom_disease_data.items():
                for disease in diseases:
                    symptoms_list.append(symptom)
                    diseases_list.append(disease)
                    
                    # Add combinations
                    for other_symptom in symptom_disease_data.keys():
                        if other_symptom != symptom:
                            symptoms_list.append(f"{symptom}, {other_symptom}")
                            diseases_list.append(disease)
            
            # Create DataFrame
            symptom_df = pd.DataFrame({
                'symptoms': symptoms_list,
                'disease': diseases_list
            })
            
            # Enhanced disease prediction data with more conditions
            disease_prediction_data = []
            for _ in range(2000):  # Increased from 1000 to 2000
                age = np.random.randint(1, 90)  # Wider age range
                gender = np.random.choice(['male', 'female'])
                blood_pressure = np.random.randint(80, 180)  # Wider range
                heart_rate = np.random.randint(50, 120)  # Wider range
                temperature = np.random.uniform(97.0, 104.0)  # Wider range
                weight = np.random.uniform(3, 150)  # From infants to obese
                height = np.random.uniform(50, 200)  # From infants to tall
                cholesterol = np.random.randint(150, 300)  # New feature
                glucose = np.random.randint(70, 200)  # New feature
                
                bmi = weight / ((height/100)**2)
                
                # Enhanced disease determination
                if blood_pressure > 140:
                    disease = 'Hypertension'
                elif blood_pressure < 90:
                    disease = 'Hypotension'
                elif heart_rate > 100:
                    disease = 'Tachycardia'
                elif heart_rate < 60:
                    disease = 'Bradycardia'
                elif temperature > 100.4:
                    disease = 'Fever'
                elif bmi > 30:
                    disease = 'Obesity'
                elif bmi < 18.5:
                    disease = 'Underweight'
                elif cholesterol > 240:
                    disease = 'Hypercholesterolemia'
                elif glucose > 126:
                    disease = 'Diabetes'
                else:
                    disease = 'Healthy'
                
                disease_prediction_data.append({
                    'age': age,
                    'gender': gender,
                    'blood_pressure': blood_pressure,
                    'heart_rate': heart_rate,
                    'temperature': temperature,
                    'weight': weight,
                    'height': height,
                    'bmi': bmi,
                    'cholesterol': cholesterol,
                    'glucose': glucose,
                    'disease': disease
                })
            
            disease_df = pd.DataFrame(disease_prediction_data)
            
       
            treatment_data = {
                # Existing diseases (unchanged)
                'Hypertension': {
                    'treatments': ['Lifestyle changes', 'ACE inhibitors', 'Beta blockers', 'Diuretics'],
                    'medications': ['Lisinopril', 'Amlodipine', 'Metoprolol', 'Hydrochlorothiazide'],
                    'lifestyle_changes': 'Reduce salt intake, exercise regularly, maintain healthy weight, limit alcohol',
                    'precautions': 'Monitor blood pressure regularly, avoid smoking, manage stress'
                },
                'Diabetes': {
                    'treatments': ['Diet management', 'Exercise', 'Insulin therapy', 'Oral medications'],
                    'medications': ['Metformin', 'Insulin', 'Sulfonylureas', 'DPP-4 inhibitors'],
                    'lifestyle_changes': 'Monitor blood sugar, eat balanced diet, exercise regularly, maintain healthy weight',
                    'precautions': 'Check blood sugar regularly, foot care, eye exams, dental care'
                },
                'Asthma': {
                    'treatments': ['Inhaled corticosteroids', 'Bronchodilators', 'Avoid triggers', 'Peak flow monitoring'],
                    'medications': ['Albuterol', 'Fluticasone', 'Salmeterol', 'Montelukast'],
                    'lifestyle_changes': 'Avoid smoke, dust, and allergens, use air purifier, exercise in clean air',
                    'precautions': 'Carry rescue inhaler, avoid cold air, monitor peak flow, get flu shots'
                },
                'Common Cold': {
                    'treatments': ['Rest', 'Hydration', 'Over-the-counter medications', 'Saltwater gargle'],
                    'medications': ['Acetaminophen', 'Ibuprofen', 'Decongestants', 'Cough suppressants'],
                    'lifestyle_changes': 'Get plenty of rest, drink fluids, use humidifier, avoid smoking',
                    'precautions': 'Wash hands frequently, avoid close contact, cover coughs and sneezes'
                },
                'Pneumonia': {
                    'treatments': ['Antibiotics', 'Rest', 'Hydration', 'Fever reducers', 'Oxygen therapy'],
                    'medications': ['Azithromycin', 'Amoxicillin', 'Doxycycline', 'Levofloxacin'],
                    'lifestyle_changes': 'Get plenty of rest, drink fluids, use humidifier, avoid smoking',
                    'precautions': 'Complete full course of antibiotics, watch for worsening symptoms'
                },
                'Migraine': {
                    'treatments': ['Pain relievers', 'Triptans', 'Anti-nausea drugs', 'Rest in dark room'],
                    'medications': ['Ibuprofen', 'Sumatriptan', 'Prochlorperazine', 'Topiramate'],
                    'lifestyle_changes': 'Identify and avoid triggers, regular sleep schedule, stay hydrated',
                    'precautions': 'Take medication at first sign, keep headache diary'
                },
                'Gastritis': {
                    'treatments': ['Antacids', 'Acid blockers', 'Diet changes', 'Avoid irritants'],
                    'medications': ['Omeprazole', 'Ranitidine', 'Sucralfate', 'Famotidine'],
                    'lifestyle_changes': 'Avoid spicy foods, limit alcohol, eat smaller meals, reduce stress',
                    'precautions': 'Watch for blood in stool, avoid NSAIDs, follow up if symptoms persist'
                },
                'Arthritis': {
                    'treatments': ['Pain relievers', 'Anti-inflammatory drugs', 'Physical therapy', 'Joint protection'],
                    'medications': ['Ibuprofen', 'Naproxen', 'Celecoxib', 'Methotrexate'],
                    'lifestyle_changes': 'Regular gentle exercise, maintain healthy weight, use assistive devices',
                    'precautions': 'Avoid overuse of joints, monitor for side effects of medications'
                },
                'Depression': {
                    'treatments': ['Therapy', 'Antidepressants', 'Lifestyle changes', 'Support groups'],
                    'medications': ['Fluoxetine', 'Sertraline', 'Escitalopram', 'Venlafaxine'],
                    'lifestyle_changes': 'Regular exercise, social connection, healthy sleep habits, stress reduction',
                    'precautions': 'Monitor for suicidal thoughts, attend regular therapy sessions'
                },
                'Hyperthyroidism': {
                    'treatments': ['Antithyroid medications', 'Radioactive iodine', 'Beta blockers', 'Surgery'],
                    'medications': ['Methimazole', 'Propylthiouracil', 'Propranolol', 'Levothyroxine'],
                    'lifestyle_changes': 'Eat balanced diet, monitor heart rate, protect eyes if Graves disease',
                    'precautions': 'Regular thyroid function tests, watch for thyroid storm symptoms'
                },
                'Bronchitis': {
                    'treatments': ['Rest', 'Hydration', 'Cough medicine', 'Bronchodilators if needed'],
                    'medications': ['Dextromethorphan', 'Guaifenesin', 'Albuterol', 'Prednisone'],
                    'lifestyle_changes': 'Avoid smoke, use humidifier, get plenty of rest, drink warm liquids',
                    'precautions': 'Watch for high fever or difficulty breathing which may indicate pneumonia'
                },
                'Urinary Tract Infection': {
                    'treatments': ['Antibiotics', 'Increased fluids', 'Pain relievers', 'Urinary analgesics'],
                    'medications': ['Nitrofurantoin', 'Trimethoprim-sulfa', 'Ciprofloxacin', 'Phenazopyridine'],
                    'lifestyle_changes': 'Drink plenty of water, urinate frequently, wipe front to back',
                    'precautions': 'Complete full antibiotic course, watch for fever or back pain'
                },
                'Gout': {
                    'treatments': ['NSAIDs', 'Colchicine', 'Corticosteroids', 'Long-term prevention'],
                    'medications': ['Ibuprofen', 'Colchicine', 'Prednisone', 'Allopurinol'],
                    'lifestyle_changes': 'Limit alcohol, reduce purine-rich foods, stay hydrated, maintain healthy weight',
                    'precautions': 'Avoid triggers, take medications as prescribed, monitor uric acid levels'
                },
                'Anemia': {
                    'treatments': ['Iron supplements', 'Diet changes', 'Treat underlying cause', 'Blood transfusion if severe'],
                    'medications': ['Ferrous sulfate', 'Ferrous gluconate', 'Vitamin B12', 'Folic acid'],
                    'lifestyle_changes': 'Eat iron-rich foods, vitamin C to aid absorption, manage fatigue',
                    'precautions': 'Follow up blood tests, watch for worsening fatigue or pale skin'
                }
            }
            
            return symptom_df, disease_df, treatment_data
    
    def train_symptom_checker(self, symptom_df):
        """Train symptom checker model"""
        print("🔍 Training Symptom Checker model...")
        
        # Prepare data
        X = symptom_df['symptoms']
        y = symptom_df['disease']
        
        # Vectorize symptoms
        vectorizer = TfidfVectorizer(max_features=1000, stop_words='english')
        X_vectorized = vectorizer.fit_transform(X)
        
        # Encode diseases
        label_encoder = LabelEncoder()
        y_encoded = label_encoder.fit_transform(y)
        
        # Train model
        model = RandomForestClassifier(n_estimators=100, random_state=42)
        model.fit(X_vectorized, y_encoded)
        
        # Save model and components
        self.models['symptom_checker'] = model
        self.vectorizers['symptom_checker'] = vectorizer
        self.encoders['symptom_checker'] = label_encoder
        
        # Evaluate
        X_train, X_test, y_train, y_test = train_test_split(
            X_vectorized, y_encoded, test_size=0.2, random_state=42
        )
        model.fit(X_train, y_train)
        y_pred = model.predict(X_test)
        accuracy = accuracy_score(y_test, y_pred)
        
        print(f"✅ Symptom Checker trained! Accuracy: {accuracy:.2f}")
        return accuracy
    
    def train_disease_prediction(self, disease_df):
        """Train disease prediction model"""
        print("📊 Training Disease Prediction model...")
        
        # Prepare features
        feature_columns = ['age', 'blood_pressure', 'heart_rate', 'temperature', 'weight', 'height', 'bmi']
        X = disease_df[feature_columns]
        y = disease_df['disease']
        
        # Encode target
        label_encoder = LabelEncoder()
        y_encoded = label_encoder.fit_transform(y)
        
        # Scale features
        scaler = StandardScaler()
        X_scaled = scaler.fit_transform(X)
        
        # Train ensemble model
        rf_model = RandomForestClassifier(n_estimators=100, random_state=42)
        xgb_model = xgb.XGBClassifier(random_state=42)
        
        # Train both models
        rf_model.fit(X_scaled, y_encoded)
        xgb_model.fit(X_scaled, y_encoded)
        
        # Save models and components
        self.models['disease_prediction'] = {
            'random_forest': rf_model,
            'xgboost': xgb_model
        }
        self.scalers['disease_prediction'] = scaler
        self.encoders['disease_prediction'] = label_encoder
        
        # Evaluate
        X_train, X_test, y_train, y_test = train_test_split(
            X_scaled, y_encoded, test_size=0.2, random_state=42
        )
        
        rf_model.fit(X_train, y_train)
        y_pred_rf = rf_model.predict(X_test)
        accuracy_rf = accuracy_score(y_test, y_pred_rf)
        
        xgb_model.fit(X_train, y_train)
        y_pred_xgb = xgb_model.predict(X_test)
        accuracy_xgb = accuracy_score(y_test, y_pred_xgb)
        
        print(f"✅ Disease Prediction trained! RF Accuracy: {accuracy_rf:.2f}, XGB Accuracy: {accuracy_xgb:.2f}")
        return max(accuracy_rf, accuracy_xgb)
    
    def train_treatment_recommendation(self, treatment_data):
        """Train treatment recommendation model"""
        print("💊 Training Treatment Recommendation model...")
        
        # Create training data
        diseases = []
        treatments = []
        medications = []
        lifestyle_changes = []
        precautions = []
        
        for disease, info in treatment_data.items():
            diseases.append(disease)
            treatments.append(info['treatments'])
            medications.append(info['medications'])
            lifestyle_changes.append(info['lifestyle_changes'])
            precautions.append(info['precautions'])
        
        # Create DataFrame
        treatment_df = pd.DataFrame({
            'disease': diseases,
            'treatments': treatments,
            'medications': medications,
            'lifestyle_changes': lifestyle_changes,
            'precautions': precautions
        })
        
        # Save treatment data
        self.models['treatment_recommendation'] = treatment_df
        
        print("✅ Treatment Recommendation model prepared!")
        return True
    
    def save_models(self):
        """Save all trained models"""
        print("💾 Saving trained models...")
        
        # Save under the app directory so Django can find them consistently
        models_dir = os.path.join(os.path.dirname(__file__), 'trained_models')
        os.makedirs(models_dir, exist_ok=True)
        
        # Save symptom checker
        with open(f'{models_dir}/symptom_checker.pkl', 'wb') as f:
            pickle.dump({
                'model': self.models['symptom_checker'],
                'vectorizer': self.vectorizers['symptom_checker'],
                'encoder': self.encoders['symptom_checker']
            }, f)
        
        # Save disease prediction
        with open(f'{models_dir}/disease_prediction.pkl', 'wb') as f:
            pickle.dump({
                'models': self.models['disease_prediction'],
                'scaler': self.scalers['disease_prediction'],
                'encoder': self.encoders['disease_prediction']
            }, f)
        
        # Save treatment recommendation
        with open(f'{models_dir}/treatment_recommendation.pkl', 'wb') as f:
            pickle.dump(self.models['treatment_recommendation'], f)
        
        # Save model info
        model_info = {
            'symptom_checker': {
                'type': 'RandomForest',
                'features': 'TF-IDF vectorized symptoms',
                'output': 'Disease classification'
            },
            'disease_prediction': {
                'type': 'Ensemble (RandomForest + XGBoost)',
                'features': 'Age, BP, HR, Temp, Weight, Height, BMI',
                'output': 'Disease risk assessment'
            },
            'treatment_recommendation': {
                'type': 'Rule-based + NLP',
                'features': 'Disease name',
                'output': 'Treatment options, medications, lifestyle changes'
            }
        }
        
        with open(f'{models_dir}/model_info.json', 'w') as f:
            json.dump(model_info, f, indent=2)
        
        print("✅ All models saved successfully!")
        print(f"📁 Models saved in: {models_dir}/")
    
    def train_all_models(self):
        """Train all three models"""
        print("🚀 Starting ML Model Training...")
        print("=" * 50)
        
        # Generate data
        symptom_df, disease_df, treatment_data = self.generate_synthetic_medical_data()
        
        # Train models
        symptom_accuracy = self.train_symptom_checker(symptom_df)
        disease_accuracy = self.train_disease_prediction(disease_df)
        treatment_success = self.train_treatment_recommendation(treatment_data)
        
        # Save models
        self.save_models()
        
        print("=" * 50)
        print("🎯 Training Complete!")
        print(f"🔍 Symptom Checker Accuracy: {symptom_accuracy:.2f}")
        print(f"📊 Disease Prediction Accuracy: {disease_accuracy:.2f}")
        print(f"💊 Treatment Recommendation: {'✅' if treatment_success else '❌'}")
        print("\n📁 Models are ready for use in your Django API!")

def main():
    """Main training function"""
    trainer = MedicalMLTrainer()
    trainer.train_all_models()

if __name__ == "__main__":
    main()

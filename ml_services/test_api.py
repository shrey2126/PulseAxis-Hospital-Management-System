#!/usr/bin/env python3
"""
Simple test script to verify Django API endpoints
Run this after starting the Django server
"""

import requests
import json

BASE_URL = "http://localhost:8000/api"

def test_chatbot():
    """Test chatbot endpoint"""
    print("Testing Chatbot API...")
    
    try:
        response = requests.post(f"{BASE_URL}/chatbot/chat/", json={
            "message": "Hello, what services do you offer?",
            "session_id": "test123"
        })
        
        if response.status_code == 200:
            print("✅ Chatbot API working!")
            print(f"Response: {response.json()}")
        else:
            print(f"❌ Chatbot API failed: {response.status_code}")
            print(f"Error: {response.text}")
            
    except Exception as e:
        print(f"❌ Chatbot API error: {e}")

def test_symptom_checker():
    """Test symptom checker endpoint"""
    print("\nTesting Symptom Checker API...")
    
    try:
        response = requests.post(f"{BASE_URL}/ml-models/symptom-checker/", json={
            "symptoms": "headache, fever, fatigue",
            "session_id": "test123"
        })
        
        if response.status_code == 200:
            print("✅ Symptom Checker API working!")
            print(f"Response: {response.json()}")
        else:
            print(f"❌ Symptom Checker API failed: {response.status_code}")
            print(f"Error: {response.text}")
            
    except Exception as e:
        print(f"❌ Symptom Checker API error: {e}")

def test_disease_prediction():
    """Test disease prediction endpoint"""
    print("\nTesting Disease Prediction API...")
    
    try:
        response = requests.post(f"{BASE_URL}/ml-models/disease-prediction/", json={
            "health_data": {
                "age": "30",
                "gender": "male",
                "symptoms": "chest pain, shortness of breath"
            },
            "session_id": "test123"
        })
        
        if response.status_code == 200:
            print("✅ Disease Prediction API working!")
            print(f"Response: {response.json()}")
        else:
            print(f"❌ Disease Prediction API failed: {response.status_code}")
            print(f"Error: {response.text}")
            
    except Exception as e:
        print(f"❌ Disease Prediction API error: {e}")

def test_treatment_info():
    """Test treatment info endpoint"""
    print("\nTesting Treatment Info API...")
    
    try:
        response = requests.post(f"{BASE_URL}/ml-models/treatment-info/", json={
            "disease_name": "Diabetes"
        })
        
        if response.status_code == 200 or response.status_code == 201:
            print("✅ Treatment Info API working!")
            print(f"Response: {response.json()}")
        else:
            print(f"❌ Treatment Info API failed: {response.status_code}")
            print(f"Error: {response.text}")
            
    except Exception as e:
        print(f"❌ Treatment Info API error: {e}")

def main():
    """Run all tests"""
    print("🏥 Testing Django AI Services API...")
    print("=" * 50)
    
    # Wait a moment for server to start
    import time
    time.sleep(2)
    
    test_chatbot()
    test_symptom_checker()
    test_disease_prediction()
    test_treatment_info()
    
    print("\n" + "=" * 50)
    print("🎯 API testing completed!")
    print("\nTo test the frontend:")
    print("1. Start React dev server: cd frontend && npm run dev")
    print("2. Navigate to /ml-services")
    print("3. Test the floating chatbot")

if __name__ == "__main__":
    main()

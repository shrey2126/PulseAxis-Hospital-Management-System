import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import AOS from 'aos';
import 'aos/dist/aos.css';

const MLServices = () => {
  const [activeTab, setActiveTab] = useState('symptom');
  const [loading, setLoading] = useState(false);

  // Symptom Checker State
  const [symptoms, setSymptoms] = useState('');
  const [symptomResult, setSymptomResult] = useState(null);

  // Disease Prediction State
  const [healthData, setHealthData] = useState({
    age: '',
    gender: '',
    bloodPressure: '',
    heartRate: '',
    temperature: '',
    weight: '',
    height: '',
    symptoms: '',
    medicalHistory: ''
  });
  const [diseaseResult, setDiseaseResult] = useState(null);

  // Treatment Info State
  const [diseaseName, setDiseaseName] = useState('');
  const [treatmentResult, setTreatmentResult] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  // Symptom Checker
  const handleSymptomCheck = async () => {
    if (!symptoms.trim()) {
      toast.error('Please enter symptoms');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/ml-models/symptom-checker/`, {
        symptoms: symptoms,
        session_id: Date.now().toString()
      });

      setSymptomResult(response.data);
      toast.success('Symptoms analyzed successfully!');
    } catch (error) {
      console.error('Symptom check error:', error);
      toast.error('Failed to analyze symptoms. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Disease Prediction
  const handleDiseasePrediction = async () => {
    const hasData = Object.values(healthData).some(value => value.trim());
    if (!hasData) {
      toast.error('Please fill in at least one health data field');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/ml-models/disease-prediction/`, {
        health_data: healthData,
        session_id: Date.now().toString()
      });

      setDiseaseResult(response.data);
      toast.success('Disease prediction completed!');
    } catch (error) {
      console.error('Disease prediction error:', error);
      toast.error('Failed to predict disease. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Treatment Info
  const handleTreatmentInfo = async () => {
    if (!diseaseName.trim()) {
      toast.error('Please enter a disease name');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/ml-models/treatment-info/`, {
        disease_name: diseaseName
      });

      setTreatmentResult(response.data);
      toast.success('Treatment information retrieved!');
    } catch (error) {
      console.error('Treatment info error:', error);
      toast.error('Failed to get treatment information. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const updateHealthData = (field, value) => {
    setHealthData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8" data-aos="fade-down">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI-Powered Medical Services
          </h1>
          <p className="text-lg text-gray-600">
            Get intelligent medical insights and assistance using advanced AI technology
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center mb-8" data-aos="zoom-in">
          {[
            { id: 'symptom', label: 'Symptom Checker', icon: '🔍' },
            { id: 'disease', label: 'Disease Prediction', icon: '📊' },
            { id: 'treatment', label: 'Treatment Info', icon: '💊' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 mx-2 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-teal-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
              data-aos="fade-up"
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-xl shadow-lg p-6" data-aos="fade-up">
          {/* Symptom Checker Tab */}
          {activeTab === 'symptom' && (
            <div className="space-y-6">
              <div className="text-center" data-aos="fade-down">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Symptom Checker</h2>
                <p className="text-gray-600">Describe your symptoms and get AI-powered analysis</p>
              </div>

              <div className="max-w-2xl mx-auto" data-aos="fade-up">
                <textarea
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  placeholder="Describe your symptoms in detail (e.g., headache, fever, fatigue, etc.)"
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                  rows="4"
                />

                <button
                  onClick={handleSymptomCheck}
                  disabled={loading}
                  className="w-full mt-4 bg-teal-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  data-aos="zoom-in"
                >
                  {loading ? 'Analyzing...' : 'Analyze Symptoms'}
                </button>

                {symptomResult && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200" data-aos="fade-left">
                    <h3 className="font-semibold text-blue-900 mb-2">Analysis Results</h3>
                    <div className="text-sm text-blue-800">
                      <p className="mb-2"><strong>Confidence Score:</strong> {symptomResult.confidence_score}%</p>
                      <div className="whitespace-pre-line">{symptomResult.possible_conditions}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Disease Prediction Tab */}
          {activeTab === 'disease' && (
            <div className="space-y-6">
              <div className="text-center" data-aos="fade-down">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Disease Prediction</h2>
                <p className="text-gray-600">Input your health data for AI-powered disease risk assessment</p>
              </div>

              <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4" data-aos="fade-up">
                <input
                  type="number"
                  placeholder="Age"
                  value={healthData.age}
                  onChange={(e) => updateHealthData('age', e.target.value)}
                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />

                <select
                  value={healthData.gender}
                  onChange={(e) => updateHealthData('gender', e.target.value)}
                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>

                <input
                  type="text"
                  placeholder="Blood Pressure (e.g., 120/80)"
                  value={healthData.bloodPressure}
                  onChange={(e) => updateHealthData('bloodPressure', e.target.value)}
                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />

                <input
                  type="number"
                  placeholder="Heart Rate (BPM)"
                  value={healthData.heartRate}
                  onChange={(e) => updateHealthData('heartRate', e.target.value)}
                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />

                <input
                  type="number"
                  placeholder="Temperature (°F)"
                  value={healthData.temperature}
                  onChange={(e) => updateHealthData('temperature', e.target.value)}
                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />

                <input
                  type="number"
                  placeholder="Weight (kg)"
                  value={healthData.weight}
                  onChange={(e) => updateHealthData('weight', e.target.value)}
                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />

                <input
                  type="number"
                  placeholder="Height (cm)"
                  value={healthData.height}
                  onChange={(e) => updateHealthData('height', e.target.value)}
                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              <div className="max-w-4xl mx-auto" data-aos="fade-up">
                <textarea
                  placeholder="Additional Symptoms"
                  value={healthData.symptoms}
                  onChange={(e) => updateHealthData('symptoms', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                  rows="3"
                />

                <textarea
                  placeholder="Medical History (any existing conditions, medications, etc.)"
                  value={healthData.medicalHistory}
                  onChange={(e) => updateHealthData('medicalHistory', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none mt-4"
                  rows="3"
                />

                <button
                  onClick={handleDiseasePrediction}
                  disabled={loading}
                  className="w-full mt-4 bg-teal-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  data-aos="zoom-in"
                >
                  {loading ? 'Analyzing...' : 'Predict Disease Risk'}
                </button>

                {diseaseResult && (
                  <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200" data-aos="fade-left">
                    <h3 className="font-semibold text-green-900 mb-2">Prediction Results</h3>
                    <div className="text-sm text-green-800 space-y-2">
                      <p><strong>Predicted Disease:</strong> {diseaseResult.predicted_disease}</p>
                      <p><strong>Risk Score:</strong> {diseaseResult.risk_score}%</p>
                      <p><strong>Confidence Level:</strong> {diseaseResult.confidence_level}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Treatment Info Tab */}
          {activeTab === 'treatment' && (
            <div className="space-y-6">
              <div className="text-center" data-aos="fade-down">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Treatment Information</h2>
                <p className="text-gray-600">Get comprehensive treatment options for various diseases</p>
              </div>

              <div className="max-w-2xl mx-auto" data-aos="fade-up">
                <input
                  type="text"
                  value={diseaseName}
                  onChange={(e) => setDiseaseName(e.target.value)}
                  placeholder="Enter disease name (e.g., Diabetes, Hypertension, Asthma)"
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />

                <button
                  onClick={handleTreatmentInfo}
                  disabled={loading}
                  className="w-full mt-4 bg-teal-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  data-aos="zoom-in"
                >
                  {loading ? 'Searching...' : 'Get Treatment Information'}
                </button>

                {treatmentResult && (
                  <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200" data-aos="fade-left">
                    <h3 className="font-semibold text-purple-900 mb-4">Treatment Information for {treatmentResult.disease_name}</h3>

                    <div className="space-y-4 text-sm text-purple-800">
                      <div>
                        <h4 className="font-semibold mb-2">Treatment Options:</h4>
                        <ul className="list-disc list-inside space-y-1">
                          {treatmentResult.treatment_options.map((option, index) => (
                            <li key={index}>{option}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Common Medications:</h4>
                        <ul className="list-disc list-inside space-y-1">
                          {treatmentResult.medications.map((med, index) => (
                            <li key={index}>{med}</li>
                          ))}
                        </ul>
                      </div>

                      {treatmentResult.lifestyle_changes && (
                        <div>
                          <h4 className="font-semibold mb-2">Lifestyle Changes:</h4>
                          <p className="whitespace-pre-line">{treatmentResult.lifestyle_changes}</p>
                        </div>
                      )}

                      {treatmentResult.precautions && (
                        <div>
                          <h4 className="font-semibold mb-2">Precautions:</h4>
                          <p className="whitespace-pre-line">{treatmentResult.precautions}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Disclaimer */}
        <div className="mt-8 text-center" data-aos="fade-up">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-4xl mx-auto">
            <p className="text-yellow-800 text-sm">
              ⚠️ <strong>Medical Disclaimer:</strong> The information provided by this AI service is for educational and informational purposes only. 
              It should not be considered as medical advice, diagnosis, or treatment. Always consult with qualified healthcare professionals for proper medical care.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MLServices;

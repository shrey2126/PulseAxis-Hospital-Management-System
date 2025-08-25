# ML Services - Django Backend

AI-powered medical services backend for the Hospital Management System.

## Features

- **Chatbot Service**: Hospital-related queries using Gemini AI
- **Symptom Checker**: AI-powered symptom analysis
- **Disease Prediction**: Health data analysis and disease risk assessment
- **Treatment Information**: Comprehensive treatment options and recommendations

## Setup

1. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

2. **Environment Variables**:
   Create a `.env` file with:
   ```
   DEBUG=True
   SECRET_KEY=your-secret-key
   GEMINI_API_KEY=your-gemini-api-key
   ```

3. **Database Migration**:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

4. **Create Superuser**:
   ```bash
   python manage.py createsuperuser
   ```

5. **Run Server**:
   ```bash
   python manage.py runserver
   ```

## API Endpoints

### Chatbot
- `POST /api/chatbot/chat/` - Send message to chatbot
- `GET /api/chatbot/history/?session_id=<id>` - Get chat history

### ML Models
- `POST /api/ml-models/symptom-checker/` - Check symptoms
- `POST /api/ml-models/disease-prediction/` - Predict disease
- `POST /api/ml-models/treatment-info/` - Get treatment information
- `GET /api/ml-models/treatment-list/` - List all treatments

## Usage

The backend integrates with Gemini AI to provide intelligent medical assistance. All responses include appropriate medical disclaimers and are for informational purposes only.

## Security

- CORS configured for frontend integration
- Environment variables for sensitive data
- Input validation and sanitization


cd backend - npm run server
cd frontend-npm run dev
cd admin-npm run dev
django_env\Scripts\activate - cd ml_services -python manage.py runserver
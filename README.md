# 🚀 PulseAxis - AI-Powered Hospital Management System 🏥🤖

PulseAxis is a **full-stack MERN + Django AI platform** designed for **smart healthcare management**.  
It brings together patients, doctors, and admins on one platform with AI-powered triage, secure payments, and real-time analytics.  

---

## ✨ Features

👩‍⚕️ **Patient**: Register → Book Appointment → AI Symptom Check → Pay → Track History  
🧑‍⚕️ **Doctor**: Manage Schedule → Consult → AI-Assisted Recommendations  
🛠 **Admin**: Monitor System → Manage Users/Doctors → Analytics & Reports  
🤖 **AI Services**:  
- Symptom Checker → **87.8% Accuracy**  
- Disease Prediction → **87.1% Accuracy**  
- Gemini-powered Chatbot → **Real-time responses**  

---

## 🛠 Tech Stack

**Frontend**: React 18, Vite, Tailwind CSS, React Router, Axios, React-Toastify  
**Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT, bcrypt, Multer  
**Payments**: Razorpay, Stripe  
**AI Services (Django)**: Django 5, DRF, scikit-learn, XGBoost, pandas, numpy, Gemini (Google Generative AI)  
**Infra & Others**: CORS, env secrets, Cloudinary  

---

## ⚡ Performance Snapshot
- **API Response**: <500 ms  
- **AI Predictions**: <100 ms  
- **Frontend Load**: <2 s  

---

## 🚀 Getting Started

### 1️⃣ Clone the repository
```bash
git clone https://github.com/shrey2126/PulseAxis-Hospital-Management-System.git
cd PulseAxis-Hospital-Management-System


## ▶️ Run All Services (One Click 🚀)

Copy & paste this script into your terminal (Windows PowerShell).  
It will start all services in **separate terminals** automatically.

```bash
# Start Backend
cd backend && npm install && start cmd /k "npm run server" && cd ..

# Start Frontend
cd frontend && npm install && start cmd /k "npm run dev" && cd ..

# Start Admin Panel
cd admin && npm install && start cmd /k "npm run dev" && cd ..

# Start Django AI Services
cd django_env && .\Scripts\activate && pip install -r requirements.txt && cd ../ml_services && start cmd /k "python manage.py runserver" && cd ..

---

## 🌍 Ports Overview

- **Backend (Node.js API)** → [http://localhost:4000](http://localhost:4000)  
- **Frontend (Patient Panel)** → [http://localhost:5173](http://localhost:5173)  
- **Admin Panel** → [http://localhost:5174](http://localhost:5174)  
- **Django AI Services** → [http://localhost:8000](http://localhost:8000)  

---



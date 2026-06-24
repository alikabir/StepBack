<div align="center">

<img src="https://img.shields.io/badge/MindBridge%20AI-Smart%20Mental%20Health%20Counselling-00f5ff?style=for-the-badge&logo=brain&logoColor=white" alt="MindBridge AI" />

# ðŸ§  MindBridge AI
### *A Multimodal Wellness Guidance Platform Using Multimodal AI*

[![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite_7-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python_3.10+-3776AB?style=flat-square&logo=python&logoColor=white)](https://www.python.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![TensorFlow](https://img.shields.io/badge/TensorFlow-FF6F00?style=flat-square&logo=tensorflow&logoColor=white)](https://www.tensorflow.org/)
[![SQLite](https://img.shields.io/badge/SQLite-003B57?style=flat-square&logo=sqlite&logoColor=white)](https://www.sqlite.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](https://smart-mental-health-counselling-sys.vercel.app)
[![Backend on Hugging Face](https://img.shields.io/badge/Backend-Hugging_Face-FFD21E?style=flat-square&logo=huggingface&logoColor=black)](https://hashmil-muahmmed08-mindcare-backend.hf.space/docs)

<br/>

> **MindBridge AI** is a full-stack intelligent mental health counselling platform that leverages **four distinct AI modalities** â€” behavioural data, facial emotion recognition, voice emotion detection, and NLP-driven chat analysis â€” to deliver a holistic, real-time mental wellness assessment and a personalized therapeutic experience.

<br/>

---

</div>

### ðŸŽ¥ Project Working Demo

https://github.com/user-attachments/assets/af17f69e-6d1a-4be5-aa71-79579b7e0fb5

<div align="center">
  <em>â–¶ MINDBRIDGE-AI - Complete Project Walkthrough (Click Play to watch)</em>
</div>

---

## ðŸ“‹ Table of Contents

- [ðŸŒŸ Project Overview](#-project-overview)
- [âœ¨ Key Features](#-key-features)
- [ðŸ—ï¸ System Architecture](#ï¸-system-architecture)
- [ðŸ¤– AI & Machine Learning Models](#-ai--machine-learning-models)
- [ðŸ› ï¸ Tech Stack](#ï¸-tech-stack)
- [ðŸ“ Project Structure](#-project-structure)
- [âš™ï¸ Project Setup & Machine Learning Resources](#ï¸-project-setup--machine-learning-resources)
- [ðŸš€ Running the Application](#-running-the-application)
- [ðŸ”Œ API Reference](#-api-reference)
- [ðŸ—ƒï¸ Database Schema](#ï¸-database-schema)
- [ðŸ–¥ï¸ Application Screens](#ï¸-application-screens)
- [ðŸ”’ Security & Authentication](#-security--authentication)
- [ðŸ¤ Contributing](#-contributing)

---

## ðŸŒŸ Project Overview

Mental health disorders are a global crisis, yet timely and accurate assessment remains a major challenge. Traditional methods rely on subjective self-reporting, which is insufficient for detecting the true severity of a user's mental state.

**MindBridge AI** solves this by combining **four independent AI modalities** into a single, unified platform. Rather than relying on one signal, the system fuses insights from:

1. ðŸ“Š **Behavioural Data** â€” Lifestyle and physiological metrics (sleep, BMI, stress, heart rate, BP)
2. ðŸ˜ **Facial Emotion** â€” Deep learning-based facial expression analysis from a live video feed
3. ðŸŽ™ï¸ **Voice Emotion** â€” Acoustic feature analysis from audio recordings to detect emotional tone
4. ðŸ’¬ **Chat Text (NLP)** â€” Conversational AI that extracts mental health indicators from natural language

The results are fused into a **Final Severity Score** (0â€“100) and a **Risk Level** (Low / Moderate / High / Critical), powering a personalized wellness dashboard with an AI therapist chatbot, daily tasks, mindfulness exercises, and curated video recommendations.

---

## ðŸŒ Live Demo

The project is fully deployed and accessible online. You can test the multimodal AI features without installing anything locally.

- **Frontend Application (Vercel):** [MindBridge AI Web App](https://smart-mental-health-counselling-sys.vercel.app)
- **Backend API & Docs (Hugging Face):** [FastAPI Swagger UI](https://hashmil-muahmmed08-mindcare-backend.hf.space/docs)

*(Note: The backend is hosted on a free Hugging Face Space and may take 1-2 minutes to wake up from sleep upon initial load. The OTP email service is currently in DEMO mode; OTPs are generated and can be viewed in the backend logs or network response).*

---

## âœ¨ Key Features

### ðŸ§ª Multimodal Assessment Pipeline

| Step | Module | Technology | Output |
|------|--------|------------|--------|
| 1 | Behavioural Test | Scikit-learn (Gradient Boosting) | Risk category + Severity score |
| 2 | Chat Counselling | OpenRouter | Sentiment, triggers, intensity score |
| 3 | Facial Emotion Detection | ResNet (`.keras`) + OpenCV | Dominant emotion + Confidence |
| 4 | Voice Emotion Detection | CNN (`.h5`/`.json`) + Librosa | Voice emotion + Stress level |
| 5 | Final Severity Report | Weighted fusion of all 4 modalities | Risk Level (Low â†’ Critical) |

### ðŸ©º Personalised Wellness Dashboard

- **Real-Time Severity Gauge** â€” Animated circular progress bar showing the fused mental health score
- **Risk Level Indicator** â€” Color-coded badge (ðŸŸ¢ Low / ðŸŸ¡ Moderate / ðŸŸ  High / ðŸ”´ Critical)
- **Historical Trends** â€” Area chart showing severity score evolution over time
- **Modality Score Breakdown** â€” Individual scores for each of the four AI channels
- **Dr. Bridge Chatbot** â€” An empathetic AI therapist powered by OpenRouter
- **Daily Wellness Tasks** â€” Personalized, severity-adaptive task checklist
- **Mindfulness Breathing Exercises** â€” Interactive guided breathing animations
- **YouTube Video Recommendations** â€” Curated mental health content based on risk profile
- **User Profile Management** â€” Edit demographic info with occupation/gender dropdowns

### ðŸ” Authentication & Access Control

- **JWT-based authentication** with secure token storage
- **Google OAuth 2.0** single sign-on integration
- **3-Step Password Reset** via OTP sent to registered email (SMTP)
- **Route guards** â€” All assessment and dashboard routes are protected

### ðŸŽ¨ Premium UI / UX

- **Dark Glassmorphism** design system throughout
- **Framer Motion** cinematic page transitions and micro-animations
- **Three.js/React Three Fiber** WebGL background on the landing page
- **GSAP animations** for scroll-driven reveals
- **Custom animated cursor** across the entire application
- **Responsive** layouts for desktop and large screens

---

## ðŸ—ï¸ System Architecture

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚                        FRONTEND  (React + Vite)                     â”‚
â”‚                                                                     â”‚
â”‚  Landing â†’ Login/Register â†’ Assessment Pipeline â†’ Dashboard         â”‚
â”‚      â”‚           â”‚               â”‚                    â”‚             â”‚
â”‚  React.js    Google OAuth    4 Modality Pages    Recharts / FM      â”‚
â”‚  WebGL BG    JWT Tokens      (Behaviour, Chat,   Dr. Bridge Bot   â”‚
â”‚                               Face, Voice)       Daily Tasks        â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
                            â”‚  HTTP / REST (Axios)
                            â”‚  Port 5173 â†’ 8000
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â–¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚                        BACKEND  (FastAPI + Python)                  â”‚
â”‚                                                                     â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”Œâ”€â”€â”€â”€â”€â”€â”€â”  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”   â”‚
â”‚  â”‚  /auth   â”‚  â”‚/behaviourâ”‚  â”‚  /chat   â”‚  â”‚/face  â”‚  â”‚ /voice  â”‚   â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â””â”€â”€â”€â”€â”€â”€â”€â”˜  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜   â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚  â”‚/severity â”‚  â”‚              /dashboard                          â”‚ â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                                                                     â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”â”‚
â”‚  â”‚                    ML / AI Services Layer                       â”‚â”‚
â”‚  â”‚  ml_loader.py â”‚ ai_service.py â”‚ nlp_service.py â”‚ email_service  â”‚â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
                            â”‚
           â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
           â–¼                â–¼                 â–¼
    â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
    â”‚  SQLite DB  â”‚  â”‚ Pre-trainedâ”‚  â”‚  OpenRouter API  â”‚
    â”‚ mindcare.db â”‚  â”‚   Models   â”‚  â”‚  (Gemini LLM)    â”‚
    â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

### Data Flow â€” Assessment Pipeline

```
User Registers/Logs In
        â”‚
        â–¼
[Step 1] Behaviour Test  â”€â”€â–º ML Model (Random Forest) â”€â”€â–º Behaviour Severity Score
        â”‚
        â–¼
[Step 2] Chat Counselling â”€â”€â–º LLM + NLP Analysis â”€â”€â”€â”€â”€â”€â–º Chat Severity Score
        â”‚
        â–¼
[Step 3] Facial Emotion  â”€â”€â–º ResNet Deep Learning â”€â”€â”€â”€â”€â–º Face Severity Score
        â”‚
        â–¼
[Step 4] Voice Analysis  â”€â”€â–º CNN + Librosa â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â–º Voice Severity Score
        â”‚
        â–¼
[Step 5] Final Severity  â”€â”€â–º Weighted Fusion Algorithm â”€â–º Risk Level + Dashboard
```

---

## ðŸ¤– AI & Machine Learning Models

### Step 1 â€” Behavioural Analysis (`Best_Mental_Behaviour_Model.pkl`)
- **Type:** Scikit-learn ensemble classifier (Gradient Boosting)
- **Input Features:** BMI category, sleep hours, sleep quality, physical activity level, stress level, heart rate, daily steps, systolic BP, diastolic BP
- **Output:** Risk category (`Low` / `Moderate` / `High`) + confidence score + severity integer (0â€“100)
- **Encoders:** `Model_Encoders.pkl` â€” handles label encoding and one-hot encoding for categorical inputs

### Step 3 â€” Facial Emotion Detection (`Resnet_model_version_2.keras`)
- **Type:** Fine-tuned ResNet Convolutional Neural Network (~303 MB)
- **Input:** Video frames captured via the user's webcam, preprocessed with OpenCV
- **Output:** Dominant facial emotion (e.g., `Sad`, `Angry`, `Neutral`, `Happy`, `Fear`, `Disgust`, `Surprise`) with per-class confidence scores
- **Severity Mapping:** Emotions are mapped to a severity integer; negative valence emotions score higher

### Step 4 â€” Voice Emotion Detection (`CNN_model.json` + `CNN_model.weights.h5`)
- **Type:** Custom 1D/2D CNN trained on acoustic features
- **Feature Extraction:** Librosa extracts MFCCs, chroma, spectral contrast, and mel-spectrogram features
- **Preprocessing:** `scaler2.pickle` (StandardScaler) + `encoder2.pickle` (LabelEncoder)
- **Output:** Voice emotion label + voice stress (`Normal` / `Stressed` / `Highly Stressed`) + voice mood + severity score

### Step 2 â€” Chat NLP Analysis (`nlp_service.py`)
- **Sentiment Analysis:** VADER (`vaderSentiment`) for rapid valence scoring + TextBlob for subjectivity
- **LLM Integration:** OpenRouter API (Gemini model) for structured mental health Q&A
- **Extracted Signals:** Problem description, duration, triggers, emotions, physical symptoms, coping strategy, support availability, daily life impact, intensity score
- **Risk Flagging:** Automatic High/Critical flag for detected crisis indicators

### Final Severity Fusion (`severity.py`)
- Combines all four modality scores using a **weighted average** algorithm
- Calculates overall risk level: `Low (0â€“30)` / `Moderate (31â€“55)` / `High (56â€“79)` / `Critical (80â€“100)`
- Generates a natural language summary note for the dashboard

---

## ðŸ› ï¸ Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.x | Core UI framework |
| Vite | 7.x | Build tool & dev server |
| Tailwind CSS | 4.x | Utility-first styling |
| Framer Motion | 12.x | Page transitions & animations |
| React Router DOM | 7.x | Client-side routing |
| Recharts | 3.x | Dashboard data visualization |
| Three.js / R3F | 0.183 / 9.x | WebGL 3D landing page background |
| GSAP | 3.x | Scroll-triggered animations |
| Lucide React | 0.575 | Icon library |
| React Hot Toast | 2.x | Notification system |
| Axios | 1.x | HTTP client |
| `@react-oauth/google` | 0.13 | Google OAuth 2.0 |
| `react-circular-progressbar` | 2.x | Severity gauge widget |
| `@vladmandic/face-api` | 1.7 | Client-side face detection helper |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| FastAPI | 0.115 | REST API framework |
| Uvicorn | 0.32 | ASGI server |
| SQLAlchemy | 2.0 | ORM & database abstraction |
| SQLite | â€” | Lightweight local database |
| TensorFlow / Keras | â‰¥2.15 | Deep learning inference (Face & Voice) |
| Scikit-learn | 1.6 | ML model inference (Behaviour) |
| Librosa | 0.10 | Audio feature extraction |
| OpenCV Headless | 4.10 | Video frame processing |
| VADER Sentiment | 3.3 | NLP sentiment analysis |
| TextBlob | 0.18 | NLP subjectivity analysis |
| Passlib + Bcrypt | 1.7 / 4.2 | Password hashing |
| python-jose | 3.3 | JWT token generation & validation |
| python-dotenv | 1.0 | Environment variable management |
| ReportLab | 4.2 | PDF generation |
| Soundfile + Noisereduce | 0.12 / 3.0 | Audio preprocessing |
| httpx | 0.27 | Async HTTP client (OpenRouter API) |

### Deployment & Infrastructure
| Technology | Purpose |
|------------|---------|
| Vercel | Frontend hosting & CI/CD pipeline |
| Hugging Face Spaces | Backend hosting (Dockerized FastAPI) |
| Docker | Containerization for ML backend environment |
| Git & GitHub | Version control and source code management |

---

## ðŸ“ Project Structure

```
MindBridge-AI/
â”‚
â”œâ”€â”€ backend/                        # FastAPI Python Backend
â”‚   â”œâ”€â”€ main.py                     # App entry point, CORS, lifespan
â”‚   â”œâ”€â”€ database.py                 # SQLAlchemy engine & session
â”‚   â”œâ”€â”€ models.py                   # All ORM table definitions
â”‚   â”œâ”€â”€ ml_loader.py                # Model loading at startup
â”‚   â”œâ”€â”€ ai_service.py               # OpenRouter/Gemini LLM service
â”‚   â”œâ”€â”€ nlp_service.py              # NLP analysis (VADER + TextBlob)
â”‚   â”œâ”€â”€ jwt_handler.py              # JWT encode/decode utilities
â”‚   â”œâ”€â”€ email_service.py            # SMTP OTP email sender
â”‚   â”œâ”€â”€ requirements.txt            # Python dependencies
â”‚   â”œâ”€â”€ mindcare.db                 # SQLite database file
â”‚   â”œâ”€â”€ routers/
â”‚   â”‚   â”œâ”€â”€ auth.py                 # Register, login, Google OAuth, OTP reset
â”‚   â”‚   â”œâ”€â”€ behaviour.py            # Behaviour test submission & history
â”‚   â”‚   â”œâ”€â”€ chat.py                 # Chat counselling & NLP analysis
â”‚   â”‚   â”œâ”€â”€ face.py                 # Facial emotion video upload & inference
â”‚   â”‚   â”œâ”€â”€ voice.py                # Voice audio upload & inference
â”‚   â”‚   â”œâ”€â”€ severity.py             # Final severity fusion & report
â”‚   â”‚   â””â”€â”€ dashboard.py            # Dashboard data, tasks, Dr. Bridge chat
â”‚   â”œâ”€â”€ Pre-trained_Models/         # â† Place downloaded models here
â”‚   â”‚   â”œâ”€â”€ Step1_Behaviour/
â”‚   â”‚   â”‚   â”œâ”€â”€ Best_Mental_Behaviour_Model.pkl
â”‚   â”‚   â”‚   â””â”€â”€ Model_Encoders.pkl
â”‚   â”‚   â”œâ”€â”€ Step3_Face/
â”‚   â”‚   â”‚   â””â”€â”€ Resnet_model_version_2.keras
â”‚   â”‚   â””â”€â”€ Step4_Voice/
â”‚   â”‚       â”œâ”€â”€ CNN_model.json
â”‚   â”‚       â”œâ”€â”€ CNN_model.weights.h5
â”‚   â”‚       â”œâ”€â”€ encoder2.pickle
â”‚   â”‚       â””â”€â”€ scaler2.pickle
â”‚   â””â”€â”€ uploads/                    # Uploaded audio/video files
â”‚
â”œâ”€â”€ frontend/                       # React + Vite Frontend
â”‚   â”œâ”€â”€ index.html
â”‚   â”œâ”€â”€ vite.config.js
â”‚   â”œâ”€â”€ package.json
â”‚   â””â”€â”€ src/
â”‚       â”œâ”€â”€ App.jsx                 # Root router with protected routes
â”‚       â”œâ”€â”€ main.jsx                # React DOM entry point
â”‚       â”œâ”€â”€ index.css               # Global styles & design tokens
â”‚       â”œâ”€â”€ api.js                  # Axios base URL configuration
â”‚       â”œâ”€â”€ contexts/
â”‚       â”‚   â””â”€â”€ AuthContext.jsx     # JWT auth state management
â”‚       â”œâ”€â”€ components/
â”‚       â”‚   â”œâ”€â”€ Particles.jsx       # Animated particle backdrop
â”‚       â”‚   â”œâ”€â”€ CustomCursor.jsx    # Custom cursor effect
â”‚       â”‚   â””â”€â”€ CinematicTransition.jsx  # Page transition wrapper
â”‚       â”œâ”€â”€ hooks/                  # Custom React hooks
â”‚       â”œâ”€â”€ services/               # API service functions
â”‚       â””â”€â”€ pages/
â”‚           â”œâ”€â”€ Landing.jsx         # Hero page (Three.js WebGL)
â”‚           â”œâ”€â”€ Login.jsx           # JWT + Google OAuth login
â”‚           â”œâ”€â”€ Register.jsx        # Multi-step registration
â”‚           â”œâ”€â”€ ForgotPassword.jsx  # 3-step OTP password reset
â”‚           â”œâ”€â”€ BehaviourTest.jsx   # Step 1: Lifestyle questionnaire
â”‚           â”œâ”€â”€ ChatCounselling.jsx # Step 2: AI chat assessment
â”‚           â”œâ”€â”€ FaceEmotion.jsx     # Step 3: Webcam facial analysis
â”‚           â”œâ”€â”€ VoiceAnalysis.jsx   # Step 4: Microphone voice analysis
â”‚           â”œâ”€â”€ FinalSeverity.jsx   # Fusion report & severity score
â”‚           â””â”€â”€ Dashboard.jsx       # Main wellness dashboard
â”‚
â”œâ”€â”€ model_training/                 # â† Place downloaded training resources here
â”‚   â”œâ”€â”€ (Jupyter notebooks for each modality)
â”‚   â””â”€â”€ (Training datasets)
â”‚
â”œâ”€â”€ run_backend.bat                 # One-click backend launcher (Windows)
â”œâ”€â”€ run_frontend.bat                # One-click frontend launcher (Windows)
â”œâ”€â”€ .gitignore
â””â”€â”€ README.md
```

---

## âš™ï¸ Project Setup & Machine Learning Resources

Due to GitHub's file size limits, the large pre-trained multimodal models and the training datasets/scripts are hosted externally on Google Drive. To fully run or explore this project, please download the resource file below:

ðŸ“¥ **[Download MindBridge Resources (Models & Training Data)](https://drive.google.com/file/d/1DdFOl4IC7EVLnwpmbJZWrMve3frvxyzX/view?usp=sharing)**

### How to Setup the Downloaded Resources:
Once you download and extract `MindBridge_Resources.zip`, you will find two folders inside. Please place them as instructed below:

1. **`Pre-trained_Models/`**: Move this entire folder directly inside the `backend/` directory of this project. (These are the `.keras`, `.h5`, and `.pkl` files required for the FastAPI backend to run).
2. **`model_training/`**: Move this folder to the root directory of the project. (This contains the Jupyter notebooks, scripts, and datasets used to train the multimodal AI models).

---

## ðŸš€ Running the Application

### Prerequisites

- **Python** 3.10 or higher
- **Node.js** 18 or higher (with npm)
- **Git**
- A webcam and microphone (required for Face & Voice analysis modules)

### 1. Clone the Repository

```bash
git clone https://github.com/Hashmil-Muhammed/Smart-Mental-Health-Counselling-System-Using-Multimodal-AI.git
cd Smart-Mental-Health-Counselling-System-Using-Multimodal-AI
```

### 2. Download & Place ML Resources

Follow the [instructions above](#ï¸-project-setup--machine-learning-resources) to download and correctly place the `Pre-trained_Models/` folder inside `backend/`.

### 3. Backend Setup

```bash
cd backend

# Create and activate a virtual environment
python -m venv venv

# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

# Install all Python dependencies
pip install -r requirements.txt
```

**Configure Backend Environment Variables:**

Create a `.env` file inside the `backend/` directory:

```env
SECRET_KEY=your_super_secret_jwt_key_here
DATABASE_URL=sqlite:///./mindcare.db
OPENROUTER_API_KEY=your_openrouter_api_key_here
SMTP_EMAIL=your_gmail_address@gmail.com
SMTP_PASSWORD=your_gmail_app_password
GOOGLE_CLIENT_ID=your_google_oauth_client_id
```

**Start the Backend Server:**

```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

The API will be live at `http://localhost:8000`
Interactive API docs available at `http://localhost:8000/docs`

### 4. Frontend Setup

```bash
cd frontend

# Install Node.js dependencies
npm install
```

**Configure Frontend Environment Variables:**

Create a `.env` file inside the `frontend/` directory:

```env
VITE_API_BASE_URL=http://localhost:8000
VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id
```

**Start the Frontend Dev Server:**

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 5. Quick Launch (Windows)

For convenience, use the provided batch scripts from the project root:

```bash
# Terminal 1 â€” Start Backend
run_backend.bat

# Terminal 2 â€” Start Frontend
run_frontend.bat
```

---

## ðŸ”Œ API Reference

The FastAPI backend automatically generates interactive documentation. Once the server is running, visit:
- **Swagger UI:** `http://localhost:8000/docs`
- **ReDoc:** `http://localhost:8000/redoc`

### Core Endpoint Summary

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/auth/register` | Register a new user account | âŒ |
| `POST` | `/auth/login` | Login with email/password â†’ JWT | âŒ |
| `POST` | `/auth/google` | Login with Google OAuth | âŒ |
| `POST` | `/auth/forgot-password` | Request OTP for password reset | âŒ |
| `POST` | `/auth/verify-otp` | Verify OTP code | âŒ |
| `POST` | `/auth/reset-password` | Set new password | âŒ |
| `POST` | `/behaviour/submit` | Submit behavioural assessment | âœ… |
| `GET` | `/behaviour/history` | Get past behaviour results | âœ… |
| `POST` | `/chat/send` | Send message to AI counsellor | âœ… |
| `GET` | `/chat/history` | Retrieve chat message history | âœ… |
| `POST` | `/face/analyze` | Upload video â†’ facial emotion | âœ… |
| `POST` | `/voice/analyze` | Upload audio â†’ voice emotion | âœ… |
| `GET` | `/severity/final` | Get fused final severity report | âœ… |
| `GET` | `/dashboard/summary` | Full dashboard data payload | âœ… |
| `GET` | `/dashboard/tasks` | Get daily wellness tasks | âœ… |
| `POST` | `/dashboard/tasks/complete` | Mark a task as completed | âœ… |
| `POST` | `/dashboard/doctor-chat` | Chat with Dr. Bridge bot | âœ… |
| `GET` | `/health` | Backend & model health check | âŒ |

> âœ… = Requires `Authorization: Bearer <token>` header

---

## ðŸ—ƒï¸ Database Schema

The SQLite database (`mindcare.db`) is managed by SQLAlchemy and contains the following tables:

| Table | Description |
|-------|-------------|
| `register_database` | User profiles (name, age, gender, occupation, email, Google ID) |
| `behaviour_results` | Behavioural test submissions with ML predictions |
| `chat_messages` | Raw chat counselling message history |
| `chat_analysis` | Structured NLP analysis results from counselling sessions |
| `face_results` | Facial emotion detection results with emotion distribution |
| `voice_results` | Voice emotion results with stress and mood labels |
| `final_severity_results` | Fused severity scores and risk level per session |
| `emergency_events` | High-severity / crisis trigger event log |
| `suggestions` | Personalized recommendations stored per severity level |
| `daily_tasks` | Daily wellness task list with completion tracking |
| `doctor_chat_messages` | Dr. Bridge AI therapist conversation history |
| `password_reset_otps` | Time-limited OTP records for password reset flow |

---

## ðŸ–¥ï¸ Application Screens

| Screen | Route | Description |
|--------|-------|-------------|
| **Landing Page** | `/` | Hero page with Three.js WebGL background, GSAP scroll animations, and feature showcase |
| **Login** | `/login` | JWT + Google OAuth sign-in with glassmorphic card |
| **Register** | `/register` | Multi-step registration with profile details |
| **Forgot Password** | `/forgot-password` | 3-step OTP-based password reset via email |
| **Behaviour Test** | `/behaviour` | Lifestyle questionnaire form â†’ ML prediction |
| **Chat Counselling** | `/chat` | NLP-powered AI chat assessment session |
| **Facial Emotion** | `/face` | Live webcam capture â†’ ResNet emotion analysis |
| **Voice Analysis** | `/voice` | Microphone recording â†’ CNN emotion analysis |
| **Final Severity** | `/severity` | Fused multimodal report with risk level |
| **Dashboard** | `/dashboard` | Main wellness hub with charts, tasks, Dr. Bridge, and video recommendations |

---

Here is a glimpse of the MindBridge AI platform in action:

| Landing Page |
| :---: |
| <img src="assets/1_landing.png" alt="Landing Page" width="925"/> |

| Register Account | Login |
| :---: | :---: |
| <img src="assets/3_register.png" alt="Register" width="450"/> | <img src="assets/2_login.png" alt="Login" width="450"/> |

| Behaviour Test Input | Behaviour Test Result |
| :---: | :---: |
| <img src="assets/4_behaviour-input.png" alt="Behaviour Input" width="450"/> | <img src="assets/5_behaviour-result.png" alt="Behaviour Result" width="450"/> |

| AI Chat Counselling | Chat Summary |
| :---: | :---: |
| <img src="assets/6_chat-counselling.png" alt="Chat Counselling" width="450"/> | <img src="assets/7_chat-summary.png" alt="Chat Summary" width="450"/> |

| Face Emotion (Recording) | Face Emotion (Result) |
| :---: | :---: |
| <img src="assets/8_face-emotion-record.png" alt="Face Recording" width="450"/> | <img src="assets/9_face-emotion-result.png" alt="Face Result" width="450"/> |

| Voice Stress (Recording) | Voice Stress (Result) |
| :---: | :---: |
| <img src="assets/10_voice-record.png" alt="Voice Recording" width="450"/> | <img src="assets/11_voice-result.png" alt="Voice Result" width="450"/> |

| Final Assessment Report | Main Dashboard |
| :---: | :---: |
| <img src="assets/12_final-report.png" alt="Final Report" width="450"/> |  <img src="assets/13_dashboard.png" alt="Main Dashboard" width="450"/> |

---

## ðŸ”’ Security & Authentication

- **Password Hashing:** Bcrypt via `passlib` â€” passwords are never stored in plaintext
- **JWT Tokens:** Signed with `python-jose`, validated on every protected route
- **Google OAuth 2.0:** Token verified server-side using Google's public key infrastructure
- **OTP Expiry:** Password reset OTPs are time-limited and invalidated after use
- **CORS:** Configured to allow only specified frontend origins
- **Environment Variables:** All secrets (API keys, SMTP credentials, JWT secret) are stored in `.env` files â€” never committed to version control

---

## ðŸ¤ Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/your-feature-name`
3. **Commit** your changes: `git commit -m 'feat: add some feature'`
4. **Push** to the branch: `git push origin feature/your-feature-name`
5. **Open** a Pull Request

Please ensure your code follows the existing project structure and styling conventions.

---

<div align="center">

**Built with â¤ï¸ for better mental wellness**

*MindBridge AI â€” Because your mind matters.*

</div>



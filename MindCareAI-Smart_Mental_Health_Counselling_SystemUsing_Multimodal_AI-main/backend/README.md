<div align="center">

# ðŸ§  MindBridge AI â€” Backend API

**A Multimodal Wellness Guidance Platform powered by Multimodal AI**

[![FastAPI](https://img.shields.io/badge/FastAPI-0.115.5-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![TensorFlow](https://img.shields.io/badge/TensorFlow-CPU-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white)](https://www.tensorflow.org/)
[![SQLite](https://img.shields.io/badge/SQLite-SQLAlchemy-003B57?style=for-the-badge&logo=sqlite&logoColor=white)](https://www.sqlalchemy.org/)
[![OpenRouter](https://img.shields.io/badge/OpenRouter-NLP_API-6C47FF?style=for-the-badge&logo=openai&logoColor=white)](https://openrouter.ai/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![HuggingFace](https://img.shields.io/badge/HuggingFace-Spaces-FFD21E?style=for-the-badge&logo=huggingface&logoColor=black)](https://huggingface.co/spaces)

</div>

---

## ðŸ“– Description

This is the **REST API backend** for the MindBridge AI platform â€” a multimodal mental health counselling system that analyses a user's **facial emotion**, **voice mood**, **behavioural patterns**, and **natural language** to generate a personalised mental wellness assessment and AI-driven counselling experience.

The backend is built with **FastAPI** and deployed as a Docker container on **Hugging Face Spaces**. It exposes endpoints for authentication, ML inference (face, voice, behaviour), real-time AI chat (via OpenRouter), session management, and dashboard analytics.

---

## ðŸ› ï¸ Tech Stack

| Layer | Technology |
|---|---|
| **Web Framework** | FastAPI 0.115.5 + Uvicorn |
| **Database** | SQLite via SQLAlchemy 2.0 |
| **Authentication** | JWT (`python-jose`) + bcrypt + Google OAuth |
| **Face Analysis** | TensorFlow/Keras (`.keras` CNN model) + OpenCV + Pillow |
| **Voice Analysis** | TensorFlow/Keras (`.h5` CNN model) + Librosa + SoundFile + NoiseReduce |
| **Behaviour Analysis** | Scikit-learn (`.pkl` model) + NumPy |
| **NLP / Chat** | OpenRouter API (via `httpx`) + TextBlob + VADER Sentiment |
| **Email / OTP** | `smtplib` + `python-dotenv` |
| **PDF Reports** | ReportLab |
| **Containerisation** | Docker (Python 3.10-slim) |

---

## ðŸ“ Project Structure

```
backend/
â”‚
â”œâ”€â”€ main.py                  # FastAPI app entry point, lifespan, CORS, router registration
â”œâ”€â”€ database.py              # SQLAlchemy engine & session setup
â”œâ”€â”€ models.py                # ORM models (User, ChatSession, PasswordResetOTP, etc.)
â”œâ”€â”€ ml_loader.py             # Loads all ML models at startup into memory
â”œâ”€â”€ ai_service.py            # OpenRouter API integration (chat, streaming, assessment extraction)
â”œâ”€â”€ nlp_service.py           # NLP analysis helpers (TextBlob, VADER, keyword extraction)
â”œâ”€â”€ email_service.py         # OTP email sending via SMTP
â”œâ”€â”€ jwt_handler.py           # JWT token creation & verification
â”‚
â”œâ”€â”€ routers/
â”‚   â”œâ”€â”€ auth.py              # /auth  â€” Register, Login, Google OAuth, Forgot Password, OTP
â”‚   â”œâ”€â”€ behaviour.py         # /behaviour â€” Questionnaire submission & ML prediction
â”‚   â”œâ”€â”€ chat.py              # /chat  â€” AI counselling chat (streaming & non-streaming)
â”‚   â”œâ”€â”€ face.py              # /face  â€” Facial emotion analysis from uploaded image
â”‚   â”œâ”€â”€ voice.py             # /voice â€” Voice mood analysis from uploaded audio
â”‚   â”œâ”€â”€ severity.py          # /severity â€” Severity score calculation & session finalisation
â”‚   â””â”€â”€ dashboard.py         # /dashboard â€” User stats, history, trend data, PDF export
â”‚
â”œâ”€â”€ Pre-trained_Models/      # âš ï¸ NOT in Git â€” must be downloaded separately (see below)
â”‚   â”œâ”€â”€ face_emotion_model.keras
â”‚   â”œâ”€â”€ voice_mood_model.h5
â”‚   â””â”€â”€ behaviour_model.pkl
â”‚
â”œâ”€â”€ uploads/                 # Temporary storage for uploaded face/voice files
â”œâ”€â”€ requirements.txt         # Python dependencies
â”œâ”€â”€ Dockerfile               # Docker build instructions for HF Spaces deployment
â””â”€â”€ .env                     # Local environment variables (never committed to Git)
```

---

## âš™ï¸ Setup & Installation

### Prerequisites
- Python **3.10 or higher**
- `pip` package manager
- Git

### 1. Clone the repository

```bash
git clone https://github.com/Hashmil-Muhammed/Smart-Mental-Health-Counselling-System-Using-Multimodal-AI.git
cd Smart-Mental-Health-Counselling-System-Using-Multimodal-AI/backend
```

### 2. Create & activate a virtual environment

```bash
# Create the virtual environment
python -m venv venv

# Activate â€” Windows (PowerShell)
venv\Scripts\Activate.ps1

# Activate â€” macOS / Linux
source venv/bin/activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

> **Note:** TensorFlow CPU build is used (`tensorflow-cpu`). If you have a CUDA-capable GPU, replace it with `tensorflow` in `requirements.txt` for better inference performance.

### 4. Configure environment variables

Create a `.env` file inside the `backend/` directory (see [Environment Variables](#-environment-variables) below).

### 5. Place the ML models

Download the pre-trained model files and place them inside `backend/Pre-trained_Models/`  
(see the [Important Note on ML Models](#-important-note-on-ml-models) section).

---

## ðŸ” Environment Variables

Create a file named `.env` inside the `backend/` directory with the following variables:

```env
# â”€â”€ JWT Authentication â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
SECRET_KEY=your_super_secret_jwt_key_here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60

# â”€â”€ Database â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
DATABASE_URL=sqlite:///./mindcare.db

# â”€â”€ OpenRouter AI API â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
OPENROUTER_API_KEY=sk-or-v1-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
OPENROUTER_MODEL=openrouter/free

# â”€â”€ SMTP Email (for OTP delivery) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your_email@gmail.com
SMTP_PASSWORD=your_app_password_here
SMTP_FROM_EMAIL=your_email@gmail.com

# â”€â”€ Google OAuth (optional) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
```

> **For Hugging Face Spaces deployment:** Set all of the above as **Repository Secrets** under  
> `Settings â†’ Variables and Secrets` in your HF Space. Do **not** commit the `.env` file.

---

## ðŸš€ Running the Server

### Development (with auto-reload)

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Production

```bash
uvicorn main:app --host 0.0.0.0 --port 7860 --workers 1
```

Once running, the interactive API docs are available at:

- **Swagger UI:** `http://localhost:8000/docs`
- **ReDoc:** `http://localhost:8000/redoc`
- **Health Check:** `http://localhost:8000/health`

---

## ðŸ—ºï¸ API Endpoints Overview

| Prefix | Router File | Description |
|---|---|---|
| `GET /` | `main.py` | Root health ping â€” returns server status and version |
| `GET /health` | `main.py` | Model load status check (behaviour, face, voice) |
| `/auth` | `routers/auth.py` | Register, Login, Google OAuth, Forgot Password, OTP verify, Reset Password |
| `/behaviour` | `routers/behaviour.py` | Submit behavioural questionnaire answers; returns ML-predicted risk score |
| `/chat` | `routers/chat.py` | Send messages to AI counsellor; stream or non-stream responses; save sessions |
| `/face` | `routers/face.py` | Upload a face image; returns detected emotion label and confidence |
| `/voice` | `routers/voice.py` | Upload an audio clip; returns predicted voice mood label |
| `/severity` | `routers/severity.py` | Calculate final severity score from multimodal inputs; finalise session |
| `/dashboard` | `routers/dashboard.py` | Fetch user stats, session history, trend data; export PDF report |

---

## âš ï¸ Important Note on ML Models

> [!CAUTION]
> **The pre-trained model files are NOT included in this repository** due to their large file sizes (often hundreds of MB). The backend **will fail to start** if these files are missing.

You must **manually download** the following files and place them inside the `backend/Pre-trained_Models/` directory before running the server:

```
backend/
â””â”€â”€ Pre-trained_Models/
    â”œâ”€â”€ face_emotion_model.keras   # TensorFlow/Keras CNN â€” facial emotion classifier
    â”œâ”€â”€ voice_mood_model.h5        # TensorFlow/Keras CNN â€” voice mood classifier
    â””â”€â”€ behaviour_model.pkl        # Scikit-learn pipeline â€” behavioural risk predictor
```

The model files are loaded into memory at application startup via `ml_loader.py`. If any model file is missing or corrupt, the server will raise a `FATAL` error and refuse to start. Ensure all three files are present and correctly named before launching.

---

## ðŸ³ Docker Deployment

A `Dockerfile` is included for containerised deployment (used for Hugging Face Spaces).

```bash
# Build the image
docker build -t mindcare-backend .

# Run the container (pass secrets as env vars)
docker run -p 7860:7860 \
  -e OPENROUTER_API_KEY=sk-or-v1-xxx \
  -e SECRET_KEY=your_secret \
  mindcare-backend
```

---

## ðŸ“„ License

This project is developed as part of an academic research initiative. All rights reserved Â© 2025 MindBridge AI.



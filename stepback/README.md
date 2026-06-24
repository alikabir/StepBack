# StepBack

StepBack is a private, anonymous daily recovery companion. It uses a React single-page app, a FastAPI backend, SQLite storage, browser audio recording, and local-first analysis with Whisper and HuggingFace models when they are available.

## Run The Backend

```powershell
cd stepback/backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

For a faster demo without loading local AI models:

```powershell
$env:STEPBACK_SKIP_MODELS="1"
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

When model loading is enabled, Whisper also needs `ffmpeg` available on your system path.

## Run The Frontend

```powershell
cd stepback/frontend
npm install
npm run dev
```

Open `http://localhost:5173`.

## Run As A Phone App

The frontend is now a PWA and a Capacitor mobile app.

Installable web app:

```powershell
cd stepback/frontend
pnpm install
pnpm run build
pnpm run preview -- --host 0.0.0.0
```

Open the preview URL on your phone, then use the browser menu to add StepBack to the home screen.

Android native wrapper:

```powershell
cd stepback/frontend
pnpm run mobile:sync
pnpm run mobile:android
```

That opens the generated Android project in Android Studio. Build or run it from Android Studio. For the emulator demo, the app uses `http://10.0.2.2:8000` as the backend; for a real phone, set `VITE_API_URL` to a reachable backend URL before building.

## Deploy The Phone Web App To Vercel

```powershell
cd stepback/frontend
pnpm install
pnpm run build
vercel
```

Set `VITE_API_URL` in Vercel Project Settings when the FastAPI backend has a public URL. Without it, the app still installs and loads, but check-ins need a reachable backend.

## Notes

- Anonymous sessions use a random UUID stored in `localStorage`.
- The database stores no names, emails, or account data.
- Audio files are written only to a temporary file during processing, then deleted.
- `POST /reset/{session_id}` clears and reseeds 14 demo entries for the current anonymous session.
- If local AI models are not installed yet, the backend uses deterministic fallback scoring so the app stays demoable.

from __future__ import annotations

import shutil
import tempfile
import uuid
from contextlib import asynccontextmanager
from pathlib import Path
from typing import Optional

from fastapi import FastAPI, File, Form, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware

import models
import pipeline


def validate_session_id(session_id: str) -> str:
    try:
        return str(uuid.UUID(session_id))
    except ValueError as exc:
        raise HTTPException(status_code=400, detail="Invalid anonymous session id.") from exc


@asynccontextmanager
async def lifespan(app: FastAPI):
    models.init_db()
    pipeline.load_models()
    yield


app = FastAPI(title="StepBack API", version="1.0.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health() -> dict[str, object]:
    return {"ok": True, "models": pipeline.model_status()}


@app.post("/checkin")
async def create_checkin(
    session_id: str = Form(...),
    text: str = Form(""),
    craving_score: int = Form(5),
    audio: Optional[UploadFile] = File(None),
) -> dict[str, object]:
    session_id = validate_session_id(session_id)
    craving_score = max(1, min(10, int(craving_score)))
    temp_path: Path | None = None

    try:
        if audio and audio.filename:
            suffix = Path(audio.filename).suffix or ".webm"
            with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as temp_file:
                shutil.copyfileobj(audio.file, temp_file)
                temp_path = Path(temp_file.name)

        if temp_path is None and not text.strip():
            raise HTTPException(
                status_code=400,
                detail="Share a short voice note or a few words before checking in.",
            )

        result = pipeline.process_checkin(
            audio_path=temp_path,
            typed_text=text,
            craving_score=craving_score,
        )
        entry = models.insert_entry(
            session_id=session_id,
            transcript=result["transcript"],
            text_emotions=result["text_emotions"],
            voice_emotions=result["voice_emotions"],
            drift_score=result["drift_score"],
            craving_score=craving_score,
            confidence_flag=result["confidence_flag"],
            risk_keywords_found=result["risk_keywords_found"],
            dominant_emotion=result["dominant_emotion"],
        )
        return {
            "entry": entry,
            "drift_score": result["drift_score"],
            "dominant_emotion": result["dominant_emotion"],
            "confidence": result["confidence_flag"],
        }
    finally:
        if temp_path and temp_path.exists():
            temp_path.unlink(missing_ok=True)
        if audio:
            await audio.close()


@app.get("/dashboard/{session_id}")
def dashboard(session_id: str) -> dict[str, object]:
    session_id = validate_session_id(session_id)
    entries = models.list_entries(session_id)
    if not entries:
        entries = models.seed_demo_data(session_id)

    return {
        "session_id": session_id,
        "entries": entries,
        "streak_count": models.calculate_streak(entries),
        "weekly_reflection": models.build_weekly_reflection(entries),
        "show_care_card": models.should_show_care_card(entries),
    }


@app.post("/reset/{session_id}")
def reset_session(session_id: str) -> dict[str, object]:
    session_id = validate_session_id(session_id)
    entries = models.seed_demo_data(session_id, replace=True)
    return {
        "session_id": session_id,
        "entries": entries,
        "streak_count": models.calculate_streak(entries),
        "weekly_reflection": models.build_weekly_reflection(entries),
        "show_care_card": models.should_show_care_card(entries),
    }


@app.get("/reset/{session_id}")
def reset_session_get(session_id: str) -> dict[str, object]:
    return reset_session(session_id)

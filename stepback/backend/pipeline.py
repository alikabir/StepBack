from __future__ import annotations

import os
import re
from pathlib import Path
from typing import Any


EMOTIONS = ["joy", "sadness", "anger", "fear", "disgust", "surprise", "neutral"]
NEGATIVE_EMOTIONS = {"sadness", "fear", "anger", "disgust"}
TEXT_MODEL = "j-hartmann/emotion-english-distilroberta-base"
VOICE_MODEL = "ehcalabres/wav2vec2-lg-xlsr-en-speech-emotion-recognition"
RISK_PHRASES = [
    "almost slipped",
    "really hard",
    "wanted to give in",
    "triggered",
    "craving",
    "cravings",
    "urge",
    "relapse",
    "slipped",
    "give in",
]


_models_loaded = False
_load_errors: dict[str, str] = {}
_whisper_model: Any | None = None
_text_classifier: Any | None = None
_voice_classifier: Any | None = None


def load_models() -> dict[str, Any]:
    """Load local models once. Failures fall back to deterministic heuristics."""
    global _models_loaded, _whisper_model, _text_classifier, _voice_classifier

    if _models_loaded:
        return model_status()

    if os.getenv("STEPBACK_SKIP_MODELS", "").lower() in {"1", "true", "yes"}:
        _load_errors["models"] = "Skipped because STEPBACK_SKIP_MODELS is set."
        _models_loaded = True
        return model_status()

    try:
        import whisper

        whisper_size = os.getenv("STEPBACK_WHISPER_MODEL", "base")
        _whisper_model = whisper.load_model(whisper_size)
    except Exception as exc:  # pragma: no cover - depends on local model setup
        _load_errors["whisper"] = str(exc)

    try:
        from transformers import pipeline as hf_pipeline

        _text_classifier = hf_pipeline(
            "text-classification",
            model=TEXT_MODEL,
            top_k=None,
        )
    except Exception as exc:  # pragma: no cover - depends on local model setup
        _load_errors["text_emotion"] = str(exc)

    try:
        from transformers import pipeline as hf_pipeline

        _voice_classifier = hf_pipeline(
            "audio-classification",
            model=VOICE_MODEL,
            top_k=None,
        )
    except Exception as exc:  # pragma: no cover - depends on local model setup
        _load_errors["voice_emotion"] = str(exc)

    _models_loaded = True
    return model_status()


def model_status() -> dict[str, Any]:
    return {
        "loaded": _models_loaded,
        "whisper": _whisper_model is not None,
        "text_emotion": _text_classifier is not None,
        "voice_emotion": _voice_classifier is not None,
        "fallbacks": _load_errors,
    }


def process_checkin(
    *,
    audio_path: Path | None,
    typed_text: str,
    craving_score: int,
) -> dict[str, Any]:
    transcript = transcribe_audio(audio_path) if audio_path else ""
    combined_text = "\n".join(part.strip() for part in [transcript, typed_text] if part.strip())

    text_emotions = analyze_text(combined_text)
    voice_emotions = analyze_voice(audio_path) if audio_path else neutral_voice_emotions()
    risk_keywords = extract_risk_keywords(combined_text)
    drift_score, confidence_flag, fused_emotions = fuse_drift_score(
        text_emotions=text_emotions,
        voice_emotions=voice_emotions,
        craving_score=craving_score,
        risk_keywords_found=risk_keywords,
    )
    dominant_emotion = max(fused_emotions, key=fused_emotions.get)

    if not combined_text:
        combined_text = "Voice note recorded. Transcript was unavailable."

    return {
        "transcript": combined_text,
        "text_emotions": text_emotions,
        "voice_emotions": voice_emotions,
        "fused_emotions": fused_emotions,
        "drift_score": drift_score,
        "craving_score": craving_score,
        "confidence_flag": confidence_flag,
        "risk_keywords_found": risk_keywords,
        "dominant_emotion": dominant_emotion,
    }


def transcribe_audio(audio_path: Path | None) -> str:
    if not audio_path or _whisper_model is None:
        return ""

    try:
        result = _whisper_model.transcribe(str(audio_path), fp16=False)
        return str(result.get("text", "")).strip()
    except Exception as exc:  # pragma: no cover - depends on ffmpeg/audio/model setup
        _load_errors["last_transcription"] = str(exc)
        return ""


def analyze_text(text: str) -> dict[str, float]:
    if _text_classifier is not None and text.strip():
        try:
            raw = _text_classifier(text[:4000])
            return normalize_classifier_output(raw)
        except Exception as exc:  # pragma: no cover - depends on local model setup
            _load_errors["last_text_analysis"] = str(exc)

    return heuristic_text_emotions(text)


def analyze_voice(audio_path: Path | None) -> dict[str, float]:
    if audio_path is not None and _voice_classifier is not None:
        try:
            import librosa

            samples, sampling_rate = librosa.load(str(audio_path), sr=16000, mono=True)
            raw = _voice_classifier(
                {"array": samples, "sampling_rate": sampling_rate},
                top_k=None,
            )
            return normalize_classifier_output(raw)
        except Exception as exc:  # pragma: no cover - depends on local model setup
            _load_errors["last_voice_analysis"] = str(exc)

    return neutral_voice_emotions()


def normalize_classifier_output(raw: Any) -> dict[str, float]:
    if isinstance(raw, list) and raw and isinstance(raw[0], list):
        raw = raw[0]

    scores = {emotion: 0.0 for emotion in EMOTIONS}
    if not isinstance(raw, list):
        return neutral_voice_emotions()

    for item in raw:
        if not isinstance(item, dict):
            continue
        label = normalize_label(str(item.get("label", "")))
        if label in scores:
            scores[label] += float(item.get("score", 0.0))

    return normalize_scores(scores)


def normalize_label(label: str) -> str:
    cleaned = label.lower().strip()
    aliases = {
        "happy": "joy",
        "happiness": "joy",
        "sad": "sadness",
        "angry": "anger",
        "calm": "neutral",
    }
    if cleaned in aliases:
        return aliases[cleaned]
    for emotion in EMOTIONS:
        if emotion in cleaned:
            return emotion
    return cleaned


def heuristic_text_emotions(text: str) -> dict[str, float]:
    lowered = text.lower()
    buckets = {
        "joy": ["good", "better", "proud", "hope", "grateful", "steady", "relieved"],
        "sadness": ["sad", "empty", "lonely", "hard", "tired", "ashamed", "down"],
        "anger": ["angry", "mad", "furious", "annoyed", "resentful"],
        "fear": ["scared", "afraid", "anxious", "worried", "triggered", "panic"],
        "disgust": ["disgust", "gross", "sick of", "hate myself"],
        "surprise": ["sudden", "unexpected", "surprised"],
    }
    scores = {
        "joy": 0.08,
        "sadness": 0.08,
        "anger": 0.06,
        "fear": 0.08,
        "disgust": 0.03,
        "surprise": 0.04,
        "neutral": 0.45,
    }

    for emotion, words in buckets.items():
        matches = sum(1 for word in words if word in lowered)
        scores[emotion] += matches * 0.18

    if any(phrase in lowered for phrase in RISK_PHRASES):
        scores["fear"] += 0.18
        scores["sadness"] += 0.14
        scores["neutral"] = max(0.08, scores["neutral"] - 0.18)

    if not lowered.strip():
        scores["neutral"] = 0.82

    return normalize_scores(scores)


def neutral_voice_emotions() -> dict[str, float]:
    return normalize_scores(
        {
            "joy": 0.06,
            "sadness": 0.07,
            "anger": 0.05,
            "fear": 0.07,
            "disgust": 0.03,
            "surprise": 0.04,
            "neutral": 0.68,
        }
    )


def normalize_scores(scores: dict[str, float]) -> dict[str, float]:
    normalized = {emotion: max(0.0, float(scores.get(emotion, 0.0))) for emotion in EMOTIONS}
    total = sum(normalized.values()) or 1.0
    return {emotion: round(score / total, 4) for emotion, score in normalized.items()}


def extract_risk_keywords(text: str) -> list[str]:
    lowered = text.lower()
    found: list[str] = []
    for phrase in RISK_PHRASES:
        pattern = r"\b" + re.escape(phrase) + r"\b"
        if re.search(pattern, lowered):
            found.append(phrase)
    return found


def fuse_drift_score(
    *,
    text_emotions: dict[str, float],
    voice_emotions: dict[str, float],
    craving_score: int,
    risk_keywords_found: list[str],
) -> tuple[int, str, dict[str, float]]:
    text_negative = sum(text_emotions.get(emotion, 0.0) for emotion in NEGATIVE_EMOTIONS)
    voice_negative = sum(voice_emotions.get(emotion, 0.0) for emotion in NEGATIVE_EMOTIONS)
    weighted_negative = (text_negative * 0.6) + (voice_negative * 0.4)

    score = int(round(weighted_negative * 100))
    if risk_keywords_found:
        score += min(12, 5 + len(risk_keywords_found) * 2)
    if craving_score >= 8:
        score += 8
    drift_score = max(0, min(100, score))

    if text_negative >= 0.55 and voice_negative >= 0.55:
        confidence_flag = "aligned-high-negative"
    elif abs(text_negative - voice_negative) >= 0.35:
        confidence_flag = "inconclusive"
    elif drift_score >= 70:
        confidence_flag = "elevated"
    else:
        confidence_flag = "steady"

    fused = normalize_scores(
        {
            emotion: (text_emotions.get(emotion, 0.0) * 0.6)
            + (voice_emotions.get(emotion, 0.0) * 0.4)
            for emotion in EMOTIONS
        }
    )
    return drift_score, confidence_flag, fused

from __future__ import annotations

import json
import sqlite3
from collections import Counter
from datetime import date, datetime, timedelta
from pathlib import Path
from typing import Any


BASE_DIR = Path(__file__).resolve().parent
DB_PATH = BASE_DIR / "stepback.sqlite3"


DEMO_EMOTIONS = [
    ("neutral", 34, 4, []),
    ("fear", 63, 7, ["triggered"]),
    ("sadness", 58, 6, ["really hard"]),
    ("joy", 24, 3, []),
    ("neutral", 37, 5, []),
    ("anger", 69, 8, ["wanted to give in", "craving"]),
    ("sadness", 72, 7, ["almost slipped"]),
    ("neutral", 42, 4, []),
    ("joy", 21, 2, []),
    ("fear", 66, 7, ["triggered", "craving"]),
    ("neutral", 35, 4, []),
    ("sadness", 55, 6, ["really hard"]),
    ("neutral", 31, 3, []),
    ("joy", 19, 2, []),
]


def get_connection() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db() -> None:
    with get_connection() as conn:
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS entries (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                session_id TEXT NOT NULL,
                created_at TEXT NOT NULL,
                entry_date TEXT NOT NULL,
                transcript TEXT NOT NULL,
                text_emotions TEXT NOT NULL,
                voice_emotions TEXT NOT NULL,
                drift_score INTEGER NOT NULL,
                craving_score INTEGER NOT NULL,
                confidence_flag TEXT NOT NULL,
                risk_keywords_found TEXT NOT NULL,
                dominant_emotion TEXT NOT NULL
            )
            """
        )
        conn.execute(
            "CREATE INDEX IF NOT EXISTS idx_entries_session_date ON entries(session_id, entry_date)"
        )


def row_to_entry(row: sqlite3.Row) -> dict[str, Any]:
    entry = dict(row)
    entry["text_emotions"] = json.loads(entry["text_emotions"])
    entry["voice_emotions"] = json.loads(entry["voice_emotions"])
    entry["risk_keywords_found"] = json.loads(entry["risk_keywords_found"])
    return entry


def insert_entry(
    *,
    session_id: str,
    transcript: str,
    text_emotions: dict[str, float],
    voice_emotions: dict[str, float],
    drift_score: int,
    craving_score: int,
    confidence_flag: str,
    risk_keywords_found: list[str],
    dominant_emotion: str,
    created_at: datetime | None = None,
) -> dict[str, Any]:
    now = created_at or datetime.now()
    with get_connection() as conn:
        cursor = conn.execute(
            """
            INSERT INTO entries (
                session_id,
                created_at,
                entry_date,
                transcript,
                text_emotions,
                voice_emotions,
                drift_score,
                craving_score,
                confidence_flag,
                risk_keywords_found,
                dominant_emotion
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                session_id,
                now.isoformat(timespec="seconds"),
                now.date().isoformat(),
                transcript,
                json.dumps(text_emotions),
                json.dumps(voice_emotions),
                int(drift_score),
                int(craving_score),
                confidence_flag,
                json.dumps(risk_keywords_found),
                dominant_emotion,
            ),
        )
        row = conn.execute(
            "SELECT * FROM entries WHERE id = ?",
            (cursor.lastrowid,),
        ).fetchone()
    return row_to_entry(row)


def list_entries(session_id: str, limit: int | None = None) -> list[dict[str, Any]]:
    query = "SELECT * FROM entries WHERE session_id = ? ORDER BY entry_date ASC, created_at ASC"
    params: tuple[Any, ...] = (session_id,)
    if limit is not None:
        query += " LIMIT ?"
        params = (session_id, limit)
    with get_connection() as conn:
        rows = conn.execute(query, params).fetchall()
    return [row_to_entry(row) for row in rows]


def clear_entries(session_id: str) -> None:
    with get_connection() as conn:
        conn.execute("DELETE FROM entries WHERE session_id = ?", (session_id,))


def latest_entry_per_day(entries: list[dict[str, Any]]) -> list[dict[str, Any]]:
    by_day: dict[str, dict[str, Any]] = {}
    for entry in entries:
        by_day[entry["entry_date"]] = entry
    return [by_day[day] for day in sorted(by_day)]


def calculate_streak(entries: list[dict[str, Any]]) -> int:
    days = {date.fromisoformat(entry["entry_date"]) for entry in entries}
    if not days:
        return 0

    today = date.today()
    cursor = today if today in days else max(days)
    streak = 0
    while cursor in days:
        streak += 1
        cursor -= timedelta(days=1)
    return streak


def should_show_care_card(entries: list[dict[str, Any]]) -> bool:
    daily = latest_entry_per_day(entries)
    if not daily:
        return False

    latest = daily[-1]
    if latest["craving_score"] >= 8:
        return True

    if len(daily) >= 2:
        last_two = daily[-2:]
        if all(entry["drift_score"] > 70 for entry in last_two):
            return True

    return False


def build_weekly_reflection(entries: list[dict[str, Any]]) -> dict[str, Any] | None:
    daily = latest_entry_per_day(entries)
    if len(daily) < 7 or len(daily) % 7 != 0:
        return None

    week = daily[-7:]
    dominant_counts = Counter(entry["dominant_emotion"] for entry in week)
    keyword_counts = Counter(
        keyword
        for entry in week
        for keyword in entry.get("risk_keywords_found", [])
    )
    hardest = max(week, key=lambda entry: entry["drift_score"])
    first_half = sum(entry["drift_score"] for entry in week[:3]) / 3
    last_half = sum(entry["drift_score"] for entry in week[-3:]) / 3

    if last_half + 5 < first_half:
        trend = "things softened toward the end of the week"
    elif last_half > first_half + 5:
        trend = "the end of the week asked more from you"
    else:
        trend = "your week stayed fairly steady"

    common_emotion = dominant_counts.most_common(1)[0][0]
    keywords = keyword_counts.most_common(3)
    keyword_text = (
        ", ".join(f"{word} ({count})" for word, count in keywords)
        if keywords
        else "no repeated trigger words"
    )
    hardest_day = datetime.fromisoformat(hardest["created_at"]).strftime("%A")

    return {
        "title": "Your week in review",
        "most_common_emotion": common_emotion,
        "hardest_day": hardest_day,
        "hardest_score": hardest["drift_score"],
        "frequent_keywords": [{"keyword": word, "count": count} for word, count in keywords],
        "streak": calculate_streak(entries),
        "summary": (
            f"This week your strongest pattern was {common_emotion}. "
            f"Your hardest day was {hardest_day}. "
            f"You mentioned {keyword_text}. Overall, {trend}."
        ),
    }


def _emotion_scores(dominant: str) -> dict[str, float]:
    base = {
        "joy": 0.06,
        "sadness": 0.08,
        "anger": 0.06,
        "fear": 0.08,
        "disgust": 0.03,
        "surprise": 0.04,
        "neutral": 0.30,
    }
    base[dominant] = 0.56 if dominant != "neutral" else 0.66
    total = sum(base.values())
    return {emotion: round(score / total, 4) for emotion, score in base.items()}


def seed_demo_data(session_id: str, replace: bool = False) -> list[dict[str, Any]]:
    if replace:
        clear_entries(session_id)

    existing = list_entries(session_id)
    if existing:
        return existing

    today = date.today()
    for offset, (dominant, drift, craving, keywords) in enumerate(DEMO_EMOTIONS):
        entry_day = today - timedelta(days=13 - offset)
        typed = "A quiet daily note for the demo."
        if keywords:
            typed = f"Today felt {keywords[0]}, but I stayed with it."
        insert_entry(
            session_id=session_id,
            transcript=typed,
            text_emotions=_emotion_scores(dominant),
            voice_emotions=_emotion_scores(dominant if dominant != "joy" else "neutral"),
            drift_score=drift,
            craving_score=craving,
            confidence_flag="demo",
            risk_keywords_found=keywords,
            dominant_emotion=dominant,
            created_at=datetime.combine(entry_day, datetime.min.time()).replace(hour=19),
        )

    return list_entries(session_id)

const EMOTIONS = ["joy", "sadness", "anger", "fear", "disgust", "surprise", "neutral"];
const LOCAL_KEY_PREFIX = "stepback_local_entries_";

const DEMO_ROWS = [
  ["neutral", 34, 4, []],
  ["fear", 63, 7, ["triggered"]],
  ["sadness", 58, 6, ["really hard"]],
  ["joy", 24, 3, []],
  ["neutral", 37, 5, []],
  ["anger", 69, 8, ["wanted to give in", "craving"]],
  ["sadness", 72, 7, ["almost slipped"]],
  ["neutral", 42, 4, []],
  ["joy", 21, 2, []],
  ["fear", 66, 7, ["triggered", "craving"]],
  ["neutral", 35, 4, []],
  ["sadness", 55, 6, ["really hard"]],
  ["neutral", 31, 3, []],
  ["joy", 19, 2, []],
];

function localKey(sessionId) {
  return `${LOCAL_KEY_PREFIX}${sessionId}`;
}

function isoDate(daysAgo) {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().slice(0, 10);
}

function emotionScores(dominant) {
  const base = {
    joy: 0.06,
    sadness: 0.08,
    anger: 0.06,
    fear: 0.08,
    disgust: 0.03,
    surprise: 0.04,
    neutral: 0.3,
  };
  base[dominant] = dominant === "neutral" ? 0.66 : 0.56;
  const total = Object.values(base).reduce((sum, value) => sum + value, 0);
  return Object.fromEntries(
    Object.entries(base).map(([name, value]) => [name, Number((value / total).toFixed(4))])
  );
}

function getStoredEntries(sessionId) {
  try {
    const parsed = JSON.parse(localStorage.getItem(localKey(sessionId)) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function setStoredEntries(sessionId, entries) {
  localStorage.setItem(localKey(sessionId), JSON.stringify(entries));
}

function makeEntry({ id, daysAgo, dominant, drift, craving, keywords, transcript }) {
  const date = isoDate(daysAgo);
  return {
    id,
    session_id: "local-demo",
    created_at: `${date}T19:00:00`,
    entry_date: date,
    transcript,
    text_emotions: emotionScores(dominant),
    voice_emotions: emotionScores(dominant === "joy" ? "neutral" : dominant),
    drift_score: drift,
    craving_score: craving,
    confidence_flag: "phone-demo",
    risk_keywords_found: keywords,
    dominant_emotion: dominant,
  };
}

export function seedLocalDashboard(sessionId) {
  const existing = getStoredEntries(sessionId);
  if (existing.length) return buildLocalDashboard(sessionId, existing);

  const entries = DEMO_ROWS.map(([dominant, drift, craving, keywords], index) =>
    makeEntry({
      id: index + 1,
      daysAgo: DEMO_ROWS.length - index - 1,
      dominant,
      drift,
      craving,
      keywords,
      transcript: keywords.length
        ? `Today felt ${keywords[0]}, but I stayed with it.`
        : "A quiet daily note for the demo.",
    })
  );
  setStoredEntries(sessionId, entries);
  return buildLocalDashboard(sessionId, entries);
}

export function addLocalCheckIn(sessionId, text, cravingScore) {
  const entries = getStoredEntries(sessionId);
  const lowered = text.toLowerCase();
  const keywords = ["almost slipped", "really hard", "wanted to give in", "triggered", "craving"]
    .filter((word) => lowered.includes(word));
  const dominant = keywords.includes("triggered") ? "fear" : keywords.length ? "sadness" : "neutral";
  const drift = Math.min(100, Math.max(12, cravingScore * 7 + keywords.length * 8));
  const entry = makeEntry({
    id: Date.now(),
    daysAgo: 0,
    dominant,
    drift,
    craving: cravingScore,
    keywords,
    transcript: text.trim() || "Voice note recorded in phone demo mode.",
  });
  const next = [...entries, entry].slice(-30);
  setStoredEntries(sessionId, next);
  return buildLocalDashboard(sessionId, next);
}

function calculateStreak(entries) {
  const days = new Set(entries.map((entry) => entry.entry_date));
  let streak = 0;
  const cursor = new Date();
  while (days.has(cursor.toISOString().slice(0, 10))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak || Math.min(entries.length, 14);
}

function weeklyReflection(entries) {
  if (entries.length < 7) return null;
  const week = entries.slice(-7);
  const hardest = [...week].sort((a, b) => b.drift_score - a.drift_score)[0];
  const counts = Object.fromEntries(EMOTIONS.map((emotion) => [emotion, 0]));
  week.forEach((entry) => {
    counts[entry.dominant_emotion] = (counts[entry.dominant_emotion] || 0) + 1;
  });
  const mostCommon = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
  const hardestDay = new Date(`${hardest.entry_date}T12:00:00`).toLocaleDateString(undefined, {
    weekday: "long",
  });
  return {
    title: "Your week in review",
    most_common_emotion: mostCommon,
    hardest_day: hardestDay,
    hardest_score: hardest.drift_score,
    frequent_keywords: [],
    streak: calculateStreak(entries),
    summary: `This week your strongest pattern was ${mostCommon}. Your hardest day was ${hardestDay}. Overall, you kept showing up.`,
  };
}

function buildLocalDashboard(sessionId, entries) {
  const latest = entries[entries.length - 1];
  return {
    session_id: sessionId,
    entries,
    streak_count: calculateStreak(entries),
    weekly_reflection: weeklyReflection(entries),
    show_care_card: latest ? latest.drift_score > 70 || latest.craving_score >= 8 : false,
    offline_demo: true,
  };
}

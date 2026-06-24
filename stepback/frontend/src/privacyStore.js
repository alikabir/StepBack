const PROFILE_KEY = "stepback_private_profile";
const ANALYTICS_KEY = "stepback_anonymous_profile";
const CHAT_KEY = "stepback_ai_chat";

function readJson(key, fallback) {
  try {
    const parsed = JSON.parse(localStorage.getItem(key) || "null");
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getPrivateProfile() {
  return readJson(PROFILE_KEY, null);
}

export function savePrivateProfile(profile) {
  const cleanProfile = {
    name: profile.name.trim(),
    age: profile.age,
    gender: profile.gender,
    phone: profile.phone.trim(),
    consumesAlcohol: profile.consumesAlcohol,
    consumesDrugs: profile.consumesDrugs,
    drugDetails: profile.drugDetails.trim(),
    physicalHealth: profile.physicalHealth.trim(),
    reminderTime: profile.reminderTime,
    savedAt: new Date().toISOString(),
  };
  writeJson(PROFILE_KEY, cleanProfile);
  writeJson(ANALYTICS_KEY, buildAnonymousSignals(cleanProfile));
  return cleanProfile;
}

export function getAnonymousSignals() {
  return readJson(ANALYTICS_KEY, null);
}

export function saveHealthSignals(signals) {
  const current = getAnonymousSignals() || {};
  const next = {
    ...current,
    health: {
      ...(current.health || {}),
      heartRate: signals.heartRate,
      sleepHours: signals.sleepHours,
      stressLevel: signals.stressLevel,
      movement: signals.movement,
      updatedAt: new Date().toISOString(),
    },
  };
  writeJson(ANALYTICS_KEY, next);
  return next;
}

export function getChatHistory() {
  return readJson(CHAT_KEY, []);
}

export function saveChatHistory(messages) {
  writeJson(CHAT_KEY, messages.slice(-30));
}

export function summarizeBehaviorFromText(text) {
  const lowered = text.toLowerCase();
  const signals = [];
  const checks = [
    ["craving", ["craving", "urge", "want to use", "wanted to drink"]],
    ["trigger", ["triggered", "stress", "argument", "party", "alone"]],
    ["sleep", ["sleep", "tired", "insomnia", "awake"]],
    ["mood drop", ["sad", "empty", "down", "hopeless"]],
    ["physical discomfort", ["heart", "pain", "shaky", "sick", "sweat"]],
  ];
  checks.forEach(([label, words]) => {
    if (words.some((word) => lowered.includes(word))) signals.push(label);
  });
  return signals;
}

function buildAnonymousSignals(profile) {
  return {
    anonymous: true,
    piiStoredOnDeviceOnly: true,
    ageBand: toAgeBand(Number(profile.age)),
    gender: profile.gender || "not specified",
    substanceFactors: {
      alcohol: profile.consumesAlcohol,
      drugs: profile.consumesDrugs,
      drugCategoryProvided: Boolean(profile.drugDetails.trim()),
    },
    health: {
      physicalHealthProvided: Boolean(profile.physicalHealth.trim()),
    },
    behaviorTags: [],
    updatedAt: new Date().toISOString(),
  };
}

function toAgeBand(age) {
  if (!age) return "not specified";
  if (age < 18) return "under 18";
  if (age <= 24) return "18-24";
  if (age <= 34) return "25-34";
  if (age <= 44) return "35-44";
  if (age <= 54) return "45-54";
  return "55+";
}

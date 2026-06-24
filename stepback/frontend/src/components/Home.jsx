import { useMemo, useState } from "react";
import { getAnonymousSignals, saveHealthSignals } from "../privacyStore.js";

const SUPPORT_CENTERS = [
  {
    name: "PILS",
    area: "Port Louis",
    type: "Community support",
    maps: "https://www.google.com/maps/search/?api=1&query=PILS+Mauritius",
  },
  {
    name: "Caritas Mauritius",
    area: "Mauritius",
    type: "Social and care support",
    maps: "https://www.google.com/maps/search/?api=1&query=Caritas+Mauritius",
  },
  {
    name: "Centre de Jour",
    area: "Mauritius",
    type: "Day support services",
    maps: "https://www.google.com/maps/search/?api=1&query=Centre+de+Jour+Mauritius",
  },
];

export default function Home({ profile, onEditProfile, onStartCheckIn, onOpenChat }) {
  const [heartRate, setHeartRate] = useState("");
  const [sleepHours, setSleepHours] = useState("");
  const [stressLevel, setStressLevel] = useState(5);
  const [movement, setMovement] = useState("light");
  const [saved, setSaved] = useState(false);
  const anonymousSignals = useMemo(() => getAnonymousSignals(), [profile, saved]);

  function saveHealth(event) {
    event.preventDefault();
    saveHealthSignals({
      heartRate: heartRate ? Number(heartRate) : null,
      sleepHours: sleepHours ? Number(sleepHours) : null,
      stressLevel,
      movement,
    });
    setSaved(true);
  }

  return (
    <section className="home-screen" aria-labelledby="home-title">
      <div className="dashboard-header">
        <div>
          <p className="eyebrow">Home</p>
          <h1 id="home-title">Hi {profile?.name || "there"}.</h1>
          <p className="offline-note">
            Reminder set for {profile?.reminderTime || "20:00"}. Daily mood logs help
            StepBack notice behavior changes.
          </p>
        </div>
        <div className="dashboard-actions">
          <button className="secondary-button" onClick={onEditProfile} type="button">
            Edit account
          </button>
          <button className="primary-button" onClick={onStartCheckIn} type="button">
            Log mood
          </button>
        </div>
      </div>

      <div className="home-grid">
        <section className="feature-panel">
          <p className="eyebrow">Health signals</p>
          <h2>Heart rate and body check</h2>
          <form className="health-form" onSubmit={saveHealth}>
            <label className="field">
              <span>Heart rate</span>
              <input
                type="number"
                min="30"
                max="220"
                inputMode="numeric"
                value={heartRate}
                onChange={(event) => setHeartRate(event.target.value)}
                placeholder="bpm"
              />
            </label>
            <label className="field">
              <span>Sleep hours</span>
              <input
                type="number"
                min="0"
                max="24"
                step="0.5"
                value={sleepHours}
                onChange={(event) => setSleepHours(event.target.value)}
                placeholder="7"
              />
            </label>
            <label className="field">
              <span>Stress level: {stressLevel}</span>
              <input
                type="range"
                min="1"
                max="10"
                value={stressLevel}
                onChange={(event) => setStressLevel(Number(event.target.value))}
              />
            </label>
            <label className="field">
              <span>Movement today</span>
              <select value={movement} onChange={(event) => setMovement(event.target.value)}>
                <option value="low">Low</option>
                <option value="light">Light</option>
                <option value="active">Active</option>
              </select>
            </label>
            <button className="secondary-button" type="submit">
              Save health check
            </button>
            {saved ? <p className="helper">Saved to your anonymous health signals.</p> : null}
          </form>
        </section>

        <section className="feature-panel">
          <p className="eyebrow">Support nearby</p>
          <h2>Closest rehab or support centre</h2>
          <p>
            Use these local support options as a starting point. Open maps to find the
            closest route from your phone.
          </p>
          <div className="support-list vertical">
            {SUPPORT_CENTERS.map((center) => (
              <article key={center.name}>
                <strong>{center.name}</strong>
                <span>{center.area} - {center.type}</span>
                <a href={center.maps} target="_blank" rel="noreferrer">
                  Open in Maps
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="feature-panel">
          <p className="eyebrow">AI companion</p>
          <h2>Chat and behavior tracking</h2>
          <p>
            The chatbot can use conversation patterns to notice triggers, cravings,
            sleep issues, and mood changes.
          </p>
          <button className="primary-button" onClick={onOpenChat} type="button">
            Open AI chat
          </button>
          <p className="medical-note">
            AI can make mistakes. Consult a professional doctor for medical advice.
          </p>
        </section>

        <section className="feature-panel">
          <p className="eyebrow">Doctor option</p>
          <h2>Consult a professional</h2>
          <p>
            If things feel unsafe or symptoms feel serious, speak with a licensed
            doctor or emergency service. StepBack is support, not a diagnosis.
          </p>
          <div className="quick-actions">
            <a className="secondary-button" href="tel:150">
              Call SAMU 150
            </a>
            <a className="secondary-button" href="https://www.google.com/maps/search/doctors+near+me" target="_blank" rel="noreferrer">
              Find doctors nearby
            </a>
          </div>
        </section>
      </div>

      <section className="privacy-card">
        <strong>Anonymous data for analysis</strong>
        <p>
          Stored signals: {anonymousSignals?.ageBand || "age band"}, substance factors,
          mood logs, cravings, health checks, and behavior tags. Name and phone are not
          included in the anonymous profile.
        </p>
      </section>
    </section>
  );
}

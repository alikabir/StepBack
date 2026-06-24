import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import AccountSetup from "./components/AccountSetup.jsx";
import AIChat from "./components/AIChat.jsx";
import CheckIn from "./components/CheckIn.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Home from "./components/Home.jsx";
import { addLocalCheckIn, seedLocalDashboard } from "./demoData.js";
import { getPrivateProfile } from "./privacyStore.js";

function resolveApiBase() {
  if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL;

  const { protocol, hostname } = window.location;
  if (protocol === "capacitor:") return "http://10.0.2.2:8000";
  if (!hostname || hostname === "localhost" || hostname === "127.0.0.1") {
    return "http://127.0.0.1:8000";
  }
  return `${window.location.protocol}//${hostname}:8000`;
}

const API_BASE = resolveApiBase();
const SESSION_KEY = "stepback_session_id";

function getSessionId() {
  const existing = localStorage.getItem(SESSION_KEY);
  if (existing) return existing;

  const next =
    crypto?.randomUUID?.() ||
    "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (char) =>
      (
        Number(char) ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (Number(char) / 4)))
      ).toString(16)
    );
  localStorage.setItem(SESSION_KEY, next);
  return next;
}

export default function App() {
  const [sessionId] = useState(getSessionId);
  const [profile, setProfile] = useState(getPrivateProfile);
  const [activeView, setActiveView] = useState(() => (getPrivateProfile() ? "home" : "account"));
  const [dashboard, setDashboard] = useState(null);
  const [loadingDashboard, setLoadingDashboard] = useState(false);
  const [error, setError] = useState("");

  const api = useMemo(
    () =>
      axios.create({
        baseURL: API_BASE,
        timeout: 120000,
      }),
    []
  );

  const loadDashboard = useCallback(async () => {
    setLoadingDashboard(true);
    setError("");
    try {
      const response = await api.get(`/dashboard/${sessionId}`);
      setDashboard(response.data);
    } catch (err) {
      setDashboard(seedLocalDashboard(sessionId));
      setError("");
    } finally {
      setLoadingDashboard(false);
    }
  }, [api, sessionId]);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  async function resetDemo() {
    setLoadingDashboard(true);
    setError("");
    try {
      const response = await api.post(`/reset/${sessionId}`);
      setDashboard(response.data);
      setActiveView("dashboard");
    } catch (err) {
      setError(err?.response?.data?.detail || "Reset could not finish just now.");
    } finally {
      setLoadingDashboard(false);
    }
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="brand" onClick={() => setActiveView(profile ? "home" : "account")} type="button">
          <span className="brand-mark">S</span>
          <span>
            <strong>StepBack</strong>
            <small>anonymous recovery companion</small>
          </span>
        </button>
        {profile ? (
          <nav className="nav-tabs" aria-label="Primary">
            <button
              className={activeView === "home" ? "is-active" : ""}
              onClick={() => setActiveView("home")}
              type="button"
            >
              Home
            </button>
            <button
              className={activeView === "checkin" ? "is-active" : ""}
              onClick={() => setActiveView("checkin")}
              type="button"
            >
              Log
            </button>
            <button
              className={activeView === "dashboard" ? "is-active" : ""}
              onClick={() => {
                setActiveView("dashboard");
                loadDashboard();
              }}
              type="button"
            >
              Data
            </button>
            <button
              className={activeView === "chat" ? "is-active" : ""}
              onClick={() => setActiveView("chat")}
              type="button"
            >
              AI
            </button>
          </nav>
        ) : null}
      </header>

      {error ? <div className="notice error">{error}</div> : null}

      <main>
        {activeView === "account" ? (
          <AccountSetup
            existingProfile={profile}
            onComplete={(savedProfile) => {
              setProfile(savedProfile);
              setActiveView("home");
            }}
          />
        ) : activeView === "home" ? (
          <Home
            profile={profile}
            onEditProfile={() => setActiveView("account")}
            onStartCheckIn={() => setActiveView("checkin")}
            onOpenChat={() => setActiveView("chat")}
          />
        ) : activeView === "checkin" ? (
          <CheckIn
            api={api}
            sessionId={sessionId}
            onOfflineSubmit={(text, cravingScore) => addLocalCheckIn(sessionId, text, cravingScore)}
            onSubmitted={(nextDashboard) => {
              if (nextDashboard) setDashboard(nextDashboard);
              loadDashboard();
              setActiveView("dashboard");
            }}
          />
        ) : activeView === "chat" ? (
          <AIChat onBack={() => setActiveView("home")} />
        ) : (
          <Dashboard
            api={api}
            sessionId={sessionId}
            data={dashboard}
            loading={loadingDashboard}
            onRefresh={loadDashboard}
            onResetDemo={resetDemo}
          />
        )}
      </main>

      <footer className="privacy-footer">
        PII stays on this device. Anonymous behavior and health signals are used for analysis.
      </footer>
    </div>
  );
}

import { useMemo, useState } from "react";
import {
  getChatHistory,
  saveChatHistory,
  summarizeBehaviorFromText,
} from "../privacyStore.js";

function makeReply(text, signals) {
  if (!text.trim()) return "I am here. Write a little about what is happening right now.";
  if (signals.includes("craving")) {
    return "I noticed craving language. Try stepping away from the trigger for two minutes, drink water, and message someone safe if you can.";
  }
  if (signals.includes("trigger")) {
    return "That sounds like a trigger moment. Name the place, person, or feeling if you can. Naming it can make the next step clearer.";
  }
  if (signals.includes("sleep")) {
    return "Sleep seems part of the pattern. A tired body can make cravings louder, so keep tonight gentle and simple.";
  }
  return "I hear you. Keep it small: one honest sentence, one breath, one next safe choice.";
}

export default function AIChat({ onBack }) {
  const [messages, setMessages] = useState(() => getChatHistory());
  const [draft, setDraft] = useState("");
  const behaviorTags = useMemo(
    () => Array.from(new Set(messages.flatMap((message) => message.signals || []))),
    [messages]
  );

  function submit(event) {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;
    const signals = summarizeBehaviorFromText(text);
    const userMessage = { role: "user", text, signals, at: new Date().toISOString() };
    const reply = {
      role: "assistant",
      text: makeReply(text, signals),
      signals: [],
      at: new Date().toISOString(),
    };
    const next = [...messages, userMessage, reply];
    setMessages(next);
    saveChatHistory(next);
    setDraft("");
  }

  return (
    <section className="chat-screen" aria-labelledby="chat-title">
      <div className="dashboard-header">
        <div>
          <p className="eyebrow">AI chat</p>
          <h1 id="chat-title">Talk it through.</h1>
          <p className="offline-note">
            Demo chatbot runs locally and tags behavior patterns on this phone.
          </p>
        </div>
        <button className="secondary-button" onClick={onBack} type="button">
          Back home
        </button>
      </div>

      <div className="chat-layout">
        <div className="chat-panel">
          {messages.length === 0 ? (
            <p className="helper">Start with what happened, what you felt, or what you need.</p>
          ) : null}
          {messages.map((message, index) => (
            <article className={`chat-bubble ${message.role}`} key={`${message.at}-${index}`}>
              <p>{message.text}</p>
              {message.signals?.length ? (
                <small>Tracked: {message.signals.join(", ")}</small>
              ) : null}
            </article>
          ))}
        </div>

        <aside className="feature-panel">
          <p className="eyebrow">Behavior signals</p>
          <h2>Patterns noticed</h2>
          {behaviorTags.length ? (
            <div className="tag-list">
              {behaviorTags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          ) : (
            <p>No patterns yet.</p>
          )}
          <p className="medical-note">
            AI can make mistakes. Consult a professional doctor for medical advice.
          </p>
        </aside>
      </div>

      <form className="chat-input" onSubmit={submit}>
        <textarea
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="I felt triggered after..."
          rows={3}
        />
        <button className="primary-button" type="submit">
          Send
        </button>
      </form>
    </section>
  );
}

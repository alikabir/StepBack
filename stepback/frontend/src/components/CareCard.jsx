import { useMemo, useState } from "react";

const SUPPORT_CONTACTS = [
  {
    name: "PILS",
    note: "Community support and practical help in Mauritius.",
  },
  {
    name: "Caritas Mauritius",
    note: "Local care network with listening and social support services.",
  },
  {
    name: "Centre de Jour",
    note: "Day support services for people who want steady local help.",
  },
];

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

export default function CareCard({ show }) {
  const storageKey = useMemo(() => `stepback_care_dismissed_${todayKey()}`, []);
  const [dismissed, setDismissed] = useState(() => localStorage.getItem(storageKey) === "1");

  if (!show || dismissed) return null;

  return (
    <section className="care-card" aria-label="Support options">
      <div>
        <p className="eyebrow">Extra support</p>
        <h2>You've had a tough few days. You don't have to do this alone.</h2>
      </div>
      <div className="support-list">
        {SUPPORT_CONTACTS.map((contact) => (
          <article key={contact.name}>
            <strong>{contact.name}</strong>
            <span>{contact.note}</span>
          </article>
        ))}
      </div>
      <button
        className="secondary-button"
        type="button"
        onClick={() => {
          localStorage.setItem(storageKey, "1");
          setDismissed(true);
        }}
      >
        Not today
      </button>
    </section>
  );
}

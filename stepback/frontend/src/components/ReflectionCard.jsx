export default function ReflectionCard({ reflection }) {
  if (!reflection) return null;

  return (
    <section className="reflection-card" aria-label="Weekly reflection">
      <p className="eyebrow">7-day pause</p>
      <h2>{reflection.title}</h2>
      <p>{reflection.summary}</p>
      <div className="reflection-meta">
        <span>Most common: {reflection.most_common_emotion}</span>
        <span>Hardest day: {reflection.hardest_day}</span>
        <span>Streak: {reflection.streak} days</span>
      </div>
    </section>
  );
}

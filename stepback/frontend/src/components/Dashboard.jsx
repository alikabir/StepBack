import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import CareCard from "./CareCard.jsx";
import ReflectionCard from "./ReflectionCard.jsx";

function formatDay(dateString) {
  return new Date(`${dateString}T12:00:00`).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

function scoreTone(score) {
  if (score >= 70) return "tough";
  if (score >= 45) return "mixed";
  return "steady";
}

export default function Dashboard({
  data,
  loading,
  onRefresh,
  onResetDemo,
}) {
  if (loading && !data) {
    return <div className="dashboard-state">Loading your dashboard...</div>;
  }

  if (!data) {
    return (
      <div className="dashboard-state">
        <p>No dashboard yet.</p>
        <button className="primary-button" onClick={onRefresh} type="button">
          Try again
        </button>
      </div>
    );
  }

  const entries = data.entries || [];
  const latest = entries[entries.length - 1];
  const chartData = entries.slice(-30).map((entry) => ({
    day: formatDay(entry.entry_date),
    drift: entry.drift_score,
    craving: entry.craving_score,
  }));
  const emotionData = Object.entries(latest?.text_emotions || {}).map(([name, value]) => ({
    name,
    value: Math.round(value * 100),
  }));
  const recent = [...entries].slice(-6).reverse();

  return (
    <section className="dashboard" aria-labelledby="dashboard-title">
      <div className="dashboard-header">
        <div>
          <p className="eyebrow">Your pattern</p>
          <h1 id="dashboard-title">Dashboard</h1>
          {data.offline_demo ? (
            <p className="offline-note">Phone demo mode: saved privately in this browser.</p>
          ) : null}
        </div>
        <div className="dashboard-actions">
          <button className="secondary-button" onClick={onRefresh} type="button">
            Refresh
          </button>
          <button className="secondary-button" onClick={onResetDemo} type="button">
            Reset demo
          </button>
        </div>
      </div>

      <div className="metric-strip">
        <div className="streak-card">
          <span>{data.streak_count}</span>
          <strong>{data.streak_count === 1 ? "day streak" : "day streak"}</strong>
          <small>you kept showing up</small>
        </div>
        <div className="mini-card">
          <span>Today</span>
          <strong>{latest ? `${latest.drift_score}/100` : "--"}</strong>
          <small>{latest ? scoreTone(latest.drift_score) : "not yet"}</small>
        </div>
        <div className="mini-card">
          <span>Craving</span>
          <strong>{latest ? `${latest.craving_score}/10` : "--"}</strong>
          <small>latest check-in</small>
        </div>
      </div>

      <div className="dashboard-grid">
        <section className="chart-panel wide" aria-label="Drift and craving trend">
          <div className="panel-heading">
            <h2>Last 30 days</h2>
            <p>DriftScore and craving intensity, side by side.</p>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={chartData} margin={{ top: 10, right: 12, bottom: 0, left: -18 }}>
              <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
              <XAxis dataKey="day" stroke="#8faaa6" tickLine={false} axisLine={false} />
              <YAxis
                yAxisId="drift"
                stroke="#8faaa6"
                tickLine={false}
                axisLine={false}
                domain={[0, 100]}
              />
              <YAxis
                yAxisId="craving"
                orientation="right"
                stroke="#8faaa6"
                tickLine={false}
                axisLine={false}
                domain={[0, 10]}
              />
              <Tooltip
                contentStyle={{
                  background: "#151a19",
                  border: "1px solid rgba(78, 205, 196, 0.28)",
                  borderRadius: 8,
                  color: "#f4fbfa",
                }}
              />
              <Line
                yAxisId="drift"
                type="monotone"
                dataKey="drift"
                stroke="#4ECDC4"
                strokeWidth={3}
                dot={false}
                name="DriftScore"
              />
              <Line
                yAxisId="craving"
                type="monotone"
                dataKey="craving"
                stroke="#F6C177"
                strokeWidth={3}
                dot={false}
                name="Craving"
              />
            </LineChart>
          </ResponsiveContainer>
        </section>

        <section className="chart-panel" aria-label="Emotion breakdown">
          <div className="panel-heading">
            <h2>Today</h2>
            <p>A soft read from the latest check-in.</p>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={emotionData} margin={{ top: 10, right: 8, bottom: 0, left: -18 }}>
              <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
              <XAxis dataKey="name" stroke="#8faaa6" tickLine={false} axisLine={false} />
              <YAxis stroke="#8faaa6" tickLine={false} axisLine={false} domain={[0, 100]} />
              <Tooltip
                contentStyle={{
                  background: "#151a19",
                  border: "1px solid rgba(78, 205, 196, 0.28)",
                  borderRadius: 8,
                  color: "#f4fbfa",
                }}
              />
              <Bar dataKey="value" fill="#4ECDC4" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </section>

        <section className="recent-panel">
          <div className="panel-heading">
            <h2>Recent entries</h2>
            <p>Just enough history to notice what is shifting.</p>
          </div>
          <div className="entry-list">
            {recent.map((entry) => (
              <article className="entry-row" key={entry.id}>
                <div>
                  <strong>{formatDay(entry.entry_date)}</strong>
                  <span>{entry.dominant_emotion}</span>
                </div>
                <b>{entry.drift_score}</b>
              </article>
            ))}
          </div>
        </section>
      </div>

      <ReflectionCard reflection={data.weekly_reflection} />
      <CareCard show={data.show_care_card} />
    </section>
  );
}

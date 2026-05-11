const PlusIcon = () => (
  <svg
    width={15}
    height={15}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

function MiniSummary({ toSchedule, toDash }) {
  return (
    <div className="hero-banner" style={{ position: "relative" }}>
      <div className="hero-greeting">Good morning 👋</div>
      <div className="hero-name">
        Welcome back, <em>Adaeze</em>
      </div>
      <div style={{ color: "rgba(255,255,255,.7)", fontSize: 14 }}>
        Your finances are on track. 3 payments due this week.
      </div>
      <div className="hero-stats">
        <div>
          <div className="hero-stat-val">NRP. 241,500</div>
          <div className="hero-stat-label">Scheduled This Month</div>
        </div>
        <div className="hero-stat-divider" />
        <div>
          <div className="hero-stat-val">NRP. 156,200</div>
          <div className="hero-stat-label">Paid So Far</div>
        </div>
        <div className="hero-stat-divider" />
        <div>
          <div className="hero-stat-val">12</div>
          <div className="hero-stat-label">Active Schedules</div>
        </div>
      </div>
      <div className="hero-cta">
        <button className="btn-hero-primary" onClick={toSchedule}>
          <PlusIcon /> New Schedule
        </button>
        <button className="btn-hero-ghost" onClick={toDash}>
          View Dashboard →
        </button>
      </div>
    </div>
  );
}

export default MiniSummary;

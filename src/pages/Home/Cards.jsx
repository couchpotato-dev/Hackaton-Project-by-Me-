function Cards() {
  const WalletIcon = () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--g500)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 12 20 22 4 22 4 12" />
      <rect x="2" y="7" width="20" height="5" />
      <path d="M12 22V7M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z" />
    </svg>
  );
  const CheckCircleIcon = () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--amber)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
  const BarsIcon = () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--g500)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );

  const StarIcon = () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--g500)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
  return (
    <div className="grid-4" style={{ marginBottom: "2rem" }}>
      {[
        {
          label: "Due This Week",
          val: "NRP. 58,500",
          sub: "3 payments pending",
          icon: <StarIcon />,
        },
        {
          label: "Wallet Balance",
          val: "NRP. 187,400",
          sub: "Sufficient ✓",
          subClass: "up",
          icon: <WalletIcon />,
        },
        {
          label: "Completed This Month",
          val: "8",
          sub: "NRP. 156,200 paid",
          icon: <CheckCircleIcon />,
        },
        {
          label: "Savings Rate",
          val: "34%",
          sub: "↑ 4% from last month",
          subClass: "up",
          icon: <BarsIcon />,
        },
      ].map((s, i) => (
        <div key={i} className="stat-card">
          <div
            className="stat-card-icon"
            style={{
              background: i === 2 ? "var(--amber-lt)" : "var(--g100)",
            }}
          >
            {s.icon}
          </div>
          <div className="stat-card-label">{s.label}</div>
          <div className="stat-card-val">{s.val}</div>
          <div className={`stat-card-sub ${s.subClass || ""}`}>{s.sub}</div>
        </div>
      ))}
    </div>
  );
}

export default Cards;

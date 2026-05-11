function Navbar({ page, setPage }) {
  const HomeIcon = () => (
    <svg
      width={15}
      height={15}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
  const DashIcon = () => (
    <svg
      width={15}
      height={15}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  );
  const HistIcon = () => (
    <svg
      width={15}
      height={15}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="9" y1="15" x2="15" y2="15" />
      <line x1="9" y1="11" x2="15" y2="11" />
    </svg>
  );
  const SchedIcon = () => (
    <svg
      width={15}
      height={15}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
  const BellIcon = () => (
    <svg
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 01-3.46 0" />
    </svg>
  );
  const ClockLogo = () => (
    <svg
      width={22}
      height={22}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#1e6e3f"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
  const navItems = [
    { id: "home", label: "Home", Icon: HomeIcon },
    { id: "dashboard", label: "Dashboard", Icon: DashIcon },
    { id: "history", label: "History", Icon: HistIcon },
    { id: "scheduler", label: "Scheduler", Icon: SchedIcon },
  ];
  return (
    <nav className="nav">
      <div className="nav-brand" onClick={() => setPage("home")}>
        <div className="nav-logo">
          <ClockLogo />
        </div>
        <div>
          <div className="nav-brand-name">PayFlow</div>
          <span className="nav-brand-sub">Smart Scheduler</span>
        </div>
      </div>
      <div className="nav-tabs">
        {navItems.map(({ id, label, Icon }) => (
          <div
            key={id}
            className={`nav-tab${page === id ? " active" : ""}`}
            onClick={() => setPage(id)}
          >
            <Icon />
            <span>{label}</span>
          </div>
        ))}
      </div>
      <div className="nav-right">
        <div className="nav-notif">
          <BellIcon />
          <div className="nav-notif-badge" />
        </div>
        <div className="nav-avatar">AK</div>
      </div>
    </nav>
  );
}

export default Navbar;

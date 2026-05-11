import React from "react";

function UpcomingPay() {
  const fData = [
    {
      icon: "⚡",
      bg: "#e8f5e9",
      name: "Electricity Bill (EKEDC)",
      detail: "Monthly · Digital Wallet",
      badgeVariant: "amber",
      badgeText: "Due Soon",
      amount: "NRP. 15,000",
      due: "May 1, 2026",
    },
    {
      icon: "📺",
      bg: "#fff3e0",
      name: "DSTV Subscription",
      detail: "Monthly · Auto-debit",
      badgeVariant: "red",
      badgeText: "2 Days",
      amount: "NRP. 8,500",
      due: "Apr 28, 2026",
    },
    {
      icon: "🏫",
      bg: "#e3f2fd",
      name: "School Fees – 3rd Term",
      detail: "Termly · Bank Transfer",
      amount: "NRP. 120,000",
      due: "May 3, 2026",
    },
    {
      icon: "🏦",
      bg: "#fce4ec",
      name: "GTBank Loan Repayment",
      detail: "Monthly · Auto-debit",
      amount: "NRP. 35,000",
      due: "May 5, 2026",
    },
    {
      icon: "📱",
      bg: "#f3e5f5",
      name: "MTN Data Plan",
      detail: "Monthly · Airtime",
      amount: "NRP. 5,000",
      due: "May 7, 2026",
    },
  ];
  const Badge = ({ variant, children }) => (
    <span className={`badge badge-${variant}`}>{children}</span>
  );
  return (
    <div className="card">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "1rem",
        }}
      >
        <div className="section-label">Upcoming Payments</div>
        <button
          className="btn btn-outline btn-sm"
          onClick={() => onNav("scheduler")}
        >
          View All
        </button>
      </div>
      {fData.map((p, i) => (
        <div key={i} className="upcoming-item">
          <div className="pay-icon" style={{ background: p.bg }}>
            {p.icon}
          </div>
          <div className="pay-meta">
            <div className="pay-name">{p.name}</div>
            <div className="pay-detail">
              {p.detail}
              {p.badgeText && (
                <Badge variant={p.badgeVariant}>{p.badgeText}</Badge>
              )}
            </div>
          </div>
          <div>
            <div className="pay-amount">{p.amount}</div>
            <div className="pay-due">{p.due}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UpcomingPay;

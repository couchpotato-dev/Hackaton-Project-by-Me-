import React from "react";

function OutflowCal() {
  return (
    <div className="card">
      <div className="section-label">Wallet Health Check</div>
      {[
        { label: "Available Balance", val: "NRP. 187,400", valStyle: {} },
        {
          label: "Scheduled Outflow",
          val: "— NRP. 183,500",
          valStyle: { color: "var(--amber)" },
        },
      ].map((r, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 6,
          }}
        >
          <span
            style={{
              fontSize: 13,
              color: i ? "var(--text-muted)" : undefined,
            }}
          >
            {r.label}
          </span>
          <span style={{ fontSize: 13, fontWeight: 600, ...r.valStyle }}>
            {r.val}
          </span>
        </div>
      ))}
      <div
        style={{
          height: 1,
          background: "var(--border)",
          margin: "10px 0",
        }}
      />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontSize: 14, fontWeight: 600 }}>Projected Balance</span>
        <span style={{ fontSize: 14, fontWeight: 600, color: "var(--g500)" }}>
          NRP. 3,900
        </span>
      </div>
      <div
        style={{
          background: "var(--amber-lt)",
          border: "1px solid rgba(230,126,34,.3)",
          borderRadius: 8,
          padding: "10px 12px",
          marginTop: 12,
          fontSize: 13,
          color: "#7a4a0a",
        }}
      >
        ⚠️ Balance will be low after scheduled payments. Consider topping up.
      </div>
    </div>
  );
}

export default OutflowCal;

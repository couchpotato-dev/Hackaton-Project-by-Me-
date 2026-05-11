import React from "react";

function MiniCalendar() {
  const payDays = [1, 3, 5, 7, 10, 12, 15, 20];
  const startDay = 5; // May 2026 starts Friday
  const prevDays = Array.from({ length: startDay }, (_, i) => ({
    day: 25 + i,
    type: "past",
  }));
  const days = Array.from({ length: 31 }, (_, i) => {
    const d = i + 1;
    return {
      day: d,
      type: d === 1 ? "today" : payDays.includes(d) ? "has-payment" : "",
    };
  });
  return (
    <div>
      <div className="mini-cal-grid">
        {["S", "M", "T", "W", "T", "F", "S"].map((n, i) => (
          <div key={i} className="mini-cal-day-name">
            {n}
          </div>
        ))}
      </div>
      <div className="mini-cal-grid" style={{ marginTop: 2 }}>
        {prevDays.map((d, i) => (
          <div key={i} className="mini-cal-day past">
            {d.day}
          </div>
        ))}
        {days.map((d) => (
          <div key={d.day} className={`mini-cal-day ${d.type}`}>
            {d.day}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MiniCalendar;

import AlertStrip from "./AlertStrip";
import MiniCalendar from "./MiniCalendar";
import MiniSummary from "./MiniSummary";
import Cards from "./Cards";
import UpcomingPay from "./UpcomingPay";
import OutflowCal from "./OutflowCal";

function HomePage({ onNav, showToast }) {
  return (
    <div className="container page-enter">
      <MiniSummary
        toSchedule={() => onNav("scheduler")}
        toDash={() => onNav("dashboard")}
      />
      <AlertStrip showToast={showToast} />
      <Cards />

      <div className="grid-2">
        <UpcomingPay />
        <div
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          <div className="card">
            <div className="section-label">Payment Calendar — May 2026</div>
            <MiniCalendar />
          </div>
          <div>
            <OutflowCal />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;

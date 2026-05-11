function AlertStrip() {
  const AlertIcon = () => (
    <svg
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

  return (
    <div className="alert-strip">
      <AlertIcon />
      <div className="alert-strip-text">
        <strong>Reminder:</strong> DSTV Subscription of NRP. 8,500 is due in 2
        days. Ensure sufficient wallet balance to avoid failed payments.
      </div>
      <button
        className="btn btn-ghost btn-sm"
        onClick={() => showToast("DSTV payment reminder snoozed for 1 day")}
      >
        Snooze
      </button>
    </div>
  );
}

export default AlertStrip;

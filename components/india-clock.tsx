"use client";

import { useEffect, useState } from "react";

// Reuse a single formatter instead of rebuilding one every tick.
const formatter = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: true,
});

function timeNow() {
  return formatter.format(new Date());
}

export default function IndiaClock() {
  const [time, setTime] = useState("--:--:--");
  const [open, setOpen] = useState(false);

  // Only tick while the popover is open, so the page is not re-rendered every
  // second for a clock nobody is looking at.
  useEffect(() => {
    if (!open) return;
    setTime(timeNow());
    const timer = window.setInterval(() => setTime(timeNow()), 1000);
    return () => window.clearInterval(timer);
  }, [open]);

  return (
    <details
      className="india-clock"
      onToggle={(event) => setOpen(event.currentTarget.open)}
    >
      <summary>
        <i aria-hidden="true" />
        <span>INDIA · IST</span>
      </summary>
      <div className="india-clock-popover">
        <strong>{time}</strong>
        <small>INDIAN STANDARD TIME · UTC +5:30</small>
      </div>
    </details>
  );
}

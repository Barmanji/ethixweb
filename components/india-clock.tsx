"use client";

import { useEffect, useState } from "react";

function timeNow() {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(new Date());
}

export default function IndiaClock() {
  const [time, setTime] = useState("--:--:--");
  useEffect(() => {
    setTime(timeNow());
    const timer = window.setInterval(() => setTime(timeNow()), 1000);
    return () => window.clearInterval(timer);
  }, []);
  return (
    <details className="india-clock">
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

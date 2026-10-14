"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  useEffect(() => {
    const saved = localStorage.getItem("ethixweb-theme");
    const initial = saved === "light" ? "light" : "dark";
    document.documentElement.dataset.theme = initial;
  }, []);

  function toggle() {
    const current = document.documentElement.dataset.theme === "light" ? "light" : "dark";
    const next = current === "dark" ? "light" : "dark";
    const apply = () => { document.documentElement.dataset.theme = next; };
    const doc = document as Document & { startViewTransition?: (callback: () => void) => { finished: Promise<void> } };
    if (doc.startViewTransition) doc.startViewTransition(apply);
    else apply();
    localStorage.setItem("ethixweb-theme", next);
    setTheme(next);
  }

  return <button className="theme-toggle" type="button" onClick={toggle} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`} title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}><span aria-hidden="true">{theme === "dark" ? "☼" : "◐"}</span><span className="theme-toggle-label">{theme === "dark" ? "Light" : "Dark"}</span></button>;
}

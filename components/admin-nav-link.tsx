"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Clerk writes the __client_uat cookie as a timestamp while a session is active,
// and "0" once signed out. Reading it lets the public marketing pages show the
// admin shortcut without loading Clerk's client bundle on every page.
function hasActiveSession() {
  return document.cookie.split("; ").some((entry) => {
    const [name, value] = entry.split("=");
    return name.startsWith("__client_uat") && value !== "" && value !== "0";
  });
}

// Shortcut to /admin, shown only to the allowlisted admin. The allowlist lives
// in ADMIN_EMAILS on the server, so the nav asks a small endpoint whether the
// current session is an admin rather than shipping the list to the browser.
// This is a convenience only: /admin still enforces access on the server.
export default function AdminNavLink({
  onNavigate,
}: {
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Skip the request entirely for signed-out visitors.
    if (!hasActiveSession()) {
      setIsAdmin(false);
      return;
    }
    let active = true;
    fetch("/api/admin/status", { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : { admin: false }))
      .then((data: { admin?: boolean }) => {
        if (active) setIsAdmin(Boolean(data?.admin));
      })
      .catch(() => {
        if (active) setIsAdmin(false);
      });
    return () => {
      active = false;
    };
  }, [pathname]);

  if (!isAdmin) return null;

  return (
    <Link
      className="nav-admin-link"
      href="/admin"
      aria-current={pathname?.startsWith("/admin") ? "page" : undefined}
      onClick={onNavigate}
    >
      Admin
    </Link>
  );
}

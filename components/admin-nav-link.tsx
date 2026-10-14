"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

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
  const { isLoaded, isSignedIn, user } = useUser();
  // The resolved admin's user id, so a different account never inherits the
  // previous session's result while its own check is in flight.
  const [adminUserId, setAdminUserId] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user) return;
    const currentId = user.id;
    let active = true;
    fetch("/api/admin/status", { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : { admin: false }))
      .then((data: { admin?: boolean }) => {
        if (active) setAdminUserId(data?.admin ? currentId : null);
      })
      .catch(() => {
        if (active) setAdminUserId(null);
      });
    return () => {
      active = false;
    };
  }, [isLoaded, isSignedIn, user]);

  const isAdmin = Boolean(user && adminUserId === user.id);
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

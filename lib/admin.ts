import "server-only";
import { auth, currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

export type AdminAccess =
  | { status: "unconfigured" }
  | { status: "unauthorized"; email: string | null }
  | { status: "authorized"; userId: string; email: string };

function clerkConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
      process.env.CLERK_SECRET_KEY,
  );
}

function isAllowlisted(email: string | null): email is string {
  if (!email) return false;
  const allowlist = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
  return allowlist.includes(email);
}

// Resolve who is asking without throwing. The page uses this to explain
// access to a signed-in visitor instead of returning a blank 404; mutations
// keep using requireAdmin so they stay strict.
export async function getAdminAccess(): Promise<AdminAccess> {
  if (!clerkConfigured()) return { status: "unconfigured" };

  // Redirects to sign-in when there is no session.
  const { userId } = await auth.protect();
  const user = await currentUser();
  const email = user?.primaryEmailAddress?.emailAddress?.toLowerCase() ?? null;
  if (!isAllowlisted(email)) return { status: "unauthorized", email };
  return { status: "authorized", userId, email };
}

export async function requireAdmin() {
  const access = await getAdminAccess();
  if (access.status !== "authorized") notFound();
  return { userId: access.userId, email: access.email };
}

// Non-redirecting check used for UI hints such as the nav shortcut. It reads
// the same ADMIN_EMAILS allowlist but only ever answers whether the *current*
// session belongs to an admin, so the list itself stays on the server. Fails
// closed when Clerk is unconfigured, there is no session, or the request
// bypassed clerkMiddleware.
export async function isCurrentUserAdmin(): Promise<boolean> {
  if (!clerkConfigured()) return false;
  try {
    const { userId } = await auth();
    if (!userId) return false;
    const user = await currentUser();
    return isAllowlisted(
      user?.primaryEmailAddress?.emailAddress?.toLowerCase() ?? null,
    );
  } catch {
    return false;
  }
}

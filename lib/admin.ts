import "server-only";
import { auth, currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

export type AdminAccess =
  | { status: "unconfigured" }
  | { status: "unauthorized"; email: string | null }
  | { status: "authorized"; userId: string; email: string };

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
  if (
    !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ||
    !process.env.CLERK_SECRET_KEY
  )
    return { status: "unconfigured" };

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

import "server-only";
import { auth, currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

export async function requireAdmin() {
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || !process.env.CLERK_SECRET_KEY) notFound();
  const { userId } = await auth.protect();
  const user = await currentUser();
  const email = user?.primaryEmailAddress?.emailAddress?.toLowerCase();
  const allowlist = (process.env.ADMIN_EMAILS ?? "").split(",").map((item) => item.trim().toLowerCase()).filter(Boolean);
  if (!email || !allowlist.includes(email)) notFound();
  return { userId, email };
}

import { connection, NextResponse } from "next/server";
import { isCurrentUserAdmin } from "@/lib/admin";

// The site nav is a client component, but the admin allowlist (ADMIN_EMAILS)
// must stay server-side. This tiny endpoint answers only "is the signed-in
// visitor an admin?" for the nav shortcut; it exposes no emails and no lead
// data. It runs at request time because it depends on the session.
export async function GET() {
  await connection();
  const admin = await isCurrentUserAdmin();
  return NextResponse.json(
    { admin },
    { headers: { "Cache-Control": "no-store" } },
  );
}

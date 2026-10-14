import ClerkGate from "@/components/clerk-gate";

// The admin workspace uses Clerk client components (<SignOutButton>) and the
// signed-in session, so Clerk loads here (and only here).
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClerkGate>{children}</ClerkGate>;
}

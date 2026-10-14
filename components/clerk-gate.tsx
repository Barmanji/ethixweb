import { ClerkProvider } from "@clerk/nextjs";

// Wraps only the routes that actually render Clerk client components
// (/admin, /sign-in, /sign-up). The public marketing pages skip ClerkProvider
// entirely, which keeps Clerk's client bundle off their critical path.
export default function ClerkGate({
  children,
}: {
  children: React.ReactNode;
}) {
  if (
    !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ||
    !process.env.CLERK_SECRET_KEY
  ) {
    return children;
  }
  return <ClerkProvider>{children}</ClerkProvider>;
}

import { SignIn } from "@clerk/nextjs";
import { Suspense } from "react";

export const instant = false;

export default function SignInPage() {
  if (
    !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ||
    !process.env.CLERK_SECRET_KEY
  )
    return (
      <main className="auth-page section-shell">
        <section className="auth-notice">
          <span className="eyebrow">ADMIN SIGN-IN</span>
          <h1>Clerk needs configuration.</h1>
          <p>
            Add the Clerk publishable and secret keys described in the lead
            intake setup guide to enable the protected workspace.
          </p>
        </section>
      </main>
    );
  return (
    <main className="auth-page section-shell">
      <Suspense
        fallback={<div className="auth-loading" aria-label="Loading sign in" />}
      >
        <SignIn />
      </Suspense>
    </main>
  );
}

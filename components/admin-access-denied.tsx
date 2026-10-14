import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";

// Shown to a signed-in visitor whose email is not on ADMIN_EMAILS. They never
// load lead data or the admin forms; they only get an explanation and a way
// out, so nobody is left stranded on a blank page.
export default function AdminAccessDenied({ email }: { email: string | null }) {
  return (
    <main className="admin-page section-shell">
      <header className="admin-heading">
        <div>
          <span className="eyebrow">PRIVATE WORKSPACE · LEADS</span>
          <h1>Admins only.</h1>
          <p>{email ? `Signed in as ${email}` : "You are signed in"}</p>
        </div>
        <SignOutButton>
          <button className="button button-quiet" type="button">
            Sign out <span aria-hidden="true">↗</span>
          </button>
        </SignOutButton>
      </header>
      <div className="admin-empty admin-gate">
        <span className="eyebrow">NOT AUTHORISED YET</span>
        <h2>This account isn’t an administrator.</h2>
        <p>
          You’re signed in, but this email isn’t on the admin allowlist yet. If
          you’re expecting access, wait for approval or email{" "}
          <a href="mailto:contact@ethixweb.com">contact@ethixweb.com</a> to
          request it.
        </p>
        <div className="admin-gate-actions">
          <Link className="button button-quiet" href="/">
            Back to site
          </Link>
          <SignOutButton>
            <button className="button button-primary" type="button">
              Sign out <span aria-hidden="true">↗</span>
            </button>
          </SignOutButton>
        </div>
      </div>
    </main>
  );
}

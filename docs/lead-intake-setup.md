# Lead intake and admin setup

## Required environment variables

Keep secrets in the hosting provider’s environment settings or an ignored local `.env` file. Do not commit them.

```env
DATABASE_URL=postgresql://...
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
ADMIN_EMAILS=you@example.com
NEXT_PUBLIC_TURNSTILE_SITE_KEY=...
TURNSTILE_SECRET_KEY=...
TURNSTILE_HOSTNAME=ethixweb.com
FORMSPREE_ENDPOINT=https://formspree.io/f/your-form-id
```

`ADMIN_EMAILS` is a comma-separated allowlist of verified Clerk primary email addresses. A Clerk account outside this list is denied access to `/admin` and every lead mutation. Set both Turnstile keys before production; the contact route refuses submissions in production if Turnstile is not configured. The development form can use Cloudflare’s published test keys.

`FORMSPREE_ENDPOINT` is read only by server code and must use the `https://formspree.io/f/<form-id>` format. Form IDs are identifiers rather than secret credentials; keep the value out of client bundles, but use Formspree’s own spam controls and the application’s Turnstile checks because the endpoint can still receive direct requests.

## Clerk

Create a Clerk application, add its publishable and secret keys, and configure the sign-in redirect to `/admin`. The app provides `/sign-in` and `/sign-up`; accounts still need an email in `ADMIN_EMAILS` to see leads. Turn off public sign-ups in Clerk when the allowed administrators have accounts.

## Database

The Prisma 7 schema stores submissions in `Lead`. Review and apply the committed migration in each environment:

```sh
npx prisma migrate deploy
npx prisma generate
```

The admin page lists the newest 200 submissions. It supports status changes, lead deletion, and retrying a failed Formspree notification. Each change verifies the Clerk session and admin email again on the server.

## Spam controls

The contact route validates Turnstile server-side, rejects a filled honeypot, checks allowed service/budget values, validates and bounds all text fields, and applies a per-process IP rate limit. Turnstile is the primary bot check; the in-memory limiter is an extra guard and does not persist across serverless instances. Formspree also receives accepted leads and applies its own spam handling. Database submissions remain visible in `/admin` if Formspree is temporarily unavailable, where the notification can be retried.

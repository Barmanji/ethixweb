import { SignOutButton } from "@clerk/nextjs";
import { connection } from "next/server";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { getAdminAccess } from "@/lib/admin";
import AdminAccessDenied from "@/components/admin-access-denied";
import { deleteLead, retryFormspree, updateLeadStatus } from "./actions";

export const instant = false;

const dateFormat = new Intl.DateTimeFormat("en-IN", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Kolkata",
});

export default async function AdminPage() {
  await connection();
  const access = await getAdminAccess();
  if (access.status === "unconfigured") notFound();
  if (access.status === "unauthorized")
    return <AdminAccessDenied email={access.email} />;
  const { email } = access;
  const [leads, total, fresh] = await Promise.all([
    prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 200 }),
    prisma.lead.count(),
    prisma.lead.count({ where: { status: "NEW" } }),
  ]);

  return (
    <main className="admin-page section-shell">
      <header className="admin-heading">
        <div>
          <span className="eyebrow">PRIVATE WORKSPACE · LEADS</span>
          <h1>Project enquiries.</h1>
          <p>Signed in as {email}</p>
        </div>
        <SignOutButton>
          <button className="button button-quiet" type="button">
            Sign out <span aria-hidden="true">↗</span>
          </button>
        </SignOutButton>
      </header>
      <div className="admin-stats">
        <article>
          <span>ALL ENQUIRIES</span>
          <strong>{total}</strong>
        </article>
        <article>
          <span>NEEDS A REPLY</span>
          <strong>{fresh}</strong>
        </article>
        <article>
          <span>SHOWN HERE</span>
          <strong>{leads.length}</strong>
        </article>
      </div>
      {leads.length ? (
        <div className="admin-lead-list">
          {leads.map((lead) => (
            <article className="admin-lead" key={lead.id}>
              <div className="admin-lead-top">
                <div>
                  <span className="eyebrow">
                    {dateFormat.format(lead.createdAt)}
                  </span>
                  <h2>{lead.name}</h2>
                  <a href={`mailto:${lead.email}`}>{lead.email}</a>
                </div>
                <span
                  className={`lead-status status-${lead.status.toLowerCase()}`}
                >
                  {lead.status}
                </span>
              </div>
              <div className="admin-lead-details">
                <p>
                  <strong>Company</strong>
                  {lead.company}
                </p>
                <p>
                  <strong>Website</strong>
                  {lead.website ? (
                    <a href={lead.website} target="_blank" rel="noreferrer">
                      {lead.website}
                    </a>
                  ) : (
                    "Not provided"
                  )}
                </p>
                <p>
                  <strong>Services</strong>
                  {lead.serviceSelection}
                </p>
              </div>
              <p className="admin-message">{lead.message}</p>
              <div className="admin-lead-actions">
                <form action={updateLeadStatus}>
                  <input type="hidden" name="id" value={lead.id} />
                  <label>
                    Status
                    <select name="status" defaultValue={lead.status}>
                      <option value="NEW">New</option>
                      <option value="CONTACTED">Contacted</option>
                      <option value="QUALIFIED">Qualified</option>
                      <option value="CLOSED">Closed</option>
                    </select>
                  </label>
                  <button className="button button-quiet" type="submit">
                    Save status
                  </button>
                </form>
                <span
                  className={
                    lead.formspreeSentAt
                      ? "delivery-status delivered"
                      : "delivery-status pending"
                  }
                >
                  {lead.formspreeSentAt
                    ? `Formspree sent ${dateFormat.format(lead.formspreeSentAt)}`
                    : "Formspree needs retry"}
                </span>
                {!lead.formspreeSentAt && (
                  <form action={retryFormspree}>
                    <input type="hidden" name="id" value={lead.id} />
                    <button className="button button-quiet" type="submit">
                      Retry notification
                    </button>
                  </form>
                )}
                <form action={deleteLead}>
                  <input type="hidden" name="id" value={lead.id} />
                  <button className="admin-delete" type="submit">
                    Delete lead
                  </button>
                </form>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="admin-empty">
          <span className="eyebrow">READY WHEN YOU ARE</span>
          <h2>No enquiries yet.</h2>
          <p>New submissions from your contact form will appear here.</p>
        </div>
      )}
    </main>
  );
}

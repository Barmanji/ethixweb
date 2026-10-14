"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/admin";
import { getFormspreeEndpoint } from "@/lib/formspree";

const statuses = ["NEW", "CONTACTED", "QUALIFIED", "CLOSED"] as const;

export async function updateLeadStatus(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!id || !statuses.includes(status as (typeof statuses)[number]))
    throw new Error("Invalid lead update.");
  await prisma.lead.update({
    where: { id },
    data: { status: status as (typeof statuses)[number] },
  });
  revalidatePath("/admin");
}

export async function deleteLead(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing lead id.");
  await prisma.lead.delete({ where: { id } });
  revalidatePath("/admin");
}

export async function retryFormspree(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const lead = await prisma.lead.findUnique({ where: { id } });
  if (!lead) throw new Error("Lead not found.");
  const body = new FormData();
  body.set("name", lead.name);
  body.set("email", lead.email);
  body.set("company", lead.company);
  body.set("website", lead.website ?? "Not provided");
  body.set("service_selection", lead.serviceSelection);
  body.set("message", lead.message);
  body.set("_subject", `New project enquiry from ${lead.name}`);
  const formspreeEndpoint = getFormspreeEndpoint();
  if (!formspreeEndpoint)
    throw new Error("Formspree endpoint is missing or invalid.");
  const response = await fetch(formspreeEndpoint, {
    method: "POST",
    body,
    headers: { Accept: "application/json" },
    cache: "no-store",
  });
  if (!response.ok)
    throw new Error("Formspree did not accept this lead. Try again shortly.");
  await prisma.lead.update({
    where: { id },
    data: { formspreeSentAt: new Date() },
  });
  revalidatePath("/admin");
}

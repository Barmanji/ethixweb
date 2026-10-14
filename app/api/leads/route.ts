import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getFormspreeEndpoint } from "@/lib/formspree";

const serviceOptions = [
  "Web design & development",
  "AI & automation",
  "Growth & discovery",
  "CRM & integrations",
  "Ongoing support",
];
const windows = new Map<string, { count: number; until: number }>();
const rateWindow = 10 * 60 * 1000;

function json(message: string, status: number) {
  return NextResponse.json({ message }, { status });
}

async function verifyTurnstile(token: string, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return process.env.NODE_ENV !== "production";
  if (!token) return false;
  const body = new URLSearchParams({ secret, response: token });
  if (ip && ip !== "unknown") body.set("remoteip", ip);
  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        body,
        cache: "no-store",
        signal: AbortSignal.timeout(8000),
      },
    );
    const result = (await response.json()) as {
      success?: boolean;
      hostname?: string;
    };
    const expectedHost = process.env.TURNSTILE_HOSTNAME;
    return Boolean(
      result.success && (!expectedHost || result.hostname === expectedHost),
    );
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin) {
    try {
      if (new URL(origin).host !== new URL(request.url).host)
        return json("Invalid request origin.", 403);
    } catch {
      return json("Invalid request origin.", 403);
    }
  }

  const form = await request.formData();
  if (String(form.get("fax_only") ?? "").trim())
    return NextResponse.json({ ok: true });
  const startedAt = Number(form.get("form_started_at"));
  if (!Number.isFinite(startedAt) || nowIsTooSoon(startedAt))
    return json(
      "Please take a moment to review your enquiry and try again.",
      400,
    );

  const ip =
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";
  const now = Date.now();
  const windowEntry = windows.get(ip);
  if (windowEntry && windowEntry.until > now && windowEntry.count >= 4)
    return json("Please wait a little before sending another enquiry.", 429);
  windows.set(
    ip,
    windowEntry && windowEntry.until > now
      ? { count: windowEntry.count + 1, until: windowEntry.until }
      : { count: 1, until: now + rateWindow },
  );
  if (windows.size > 2000)
    for (const [key, value] of windows)
      if (value.until < now) windows.delete(key);

  const token = String(form.get("cf-turnstile-response") ?? "");
  if (
    process.env.NODE_ENV === "production" &&
    (!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ||
      !process.env.TURNSTILE_SECRET_KEY)
  ) {
    return json(
      "The contact form is not fully configured yet. Please email contact@ethixweb.com.",
      503,
    );
  }
  if (!(await verifyTurnstile(token, ip)))
    return json("Please complete the security check and try again.", 400);

  const value = (key: string) => String(form.get(key) ?? "").trim();
  const name = value("name");
  const email = value("email").toLowerCase();
  const company = value("company");
  const rawWebsite = value("website");
  const message = value("message");
  const selectedServices = value("service_selection")
    .split(", ")
    .filter(Boolean);
  if (
    name.length < 2 ||
    name.length > 120 ||
    company.length < 2 ||
    company.length > 160
  )
    return json("Please check your name and company details.", 400);
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return json("Please enter a valid email address.", 400);
  if (message.length < 20 || message.length > 5000)
    return json("Please add a little more detail about your project.", 400);
  if (
    !selectedServices.length ||
    selectedServices.some((item) => !serviceOptions.includes(item))
  )
    return json("Choose at least one service area.", 400);
  let website: string | null = null;
  if (rawWebsite) {
    try {
      const url = new URL(
        rawWebsite.startsWith("http") ? rawWebsite : `https://${rawWebsite}`,
      );
      if (!/^https?:$/.test(url.protocol) || !url.hostname.includes("."))
        throw new Error();
      website = url.toString();
    } catch {
      return json("Please enter a valid website address.", 400);
    }
  }

  let lead;
  try {
    lead = await prisma.lead.create({
      data: {
        name,
        email,
        company,
        website,
        serviceSelection: selectedServices.join(", "),
        message,
      },
    });
  } catch (error) {
    console.error("Lead could not be stored.", error);
    return json(
      "We couldn’t store your enquiry just now. Please try again or email contact@ethixweb.com.",
      503,
    );
  }

  const formspreeData = new FormData();
  formspreeData.set("name", name);
  formspreeData.set("email", email);
  formspreeData.set("company", company);
  formspreeData.set("website", website ?? "Not provided");
  formspreeData.set("service_selection", selectedServices.join(", "));
  formspreeData.set("message", message);
  formspreeData.set("_subject", `New project enquiry from ${name}`);
  let delivered = false;
  const formspreeEndpoint = getFormspreeEndpoint();
  if (!formspreeEndpoint) {
    console.error("Formspree endpoint is missing or invalid for lead", lead.id);
  } else {
    try {
      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        body: formspreeData,
        headers: { Accept: "application/json" },
        cache: "no-store",
        signal: AbortSignal.timeout(10000),
      });
      delivered = response.ok;
    } catch (error) {
      console.error("Formspree delivery failed for lead", lead.id, error);
    }
  }
  if (delivered) {
    try {
      await prisma.lead.update({
        where: { id: lead.id },
        data: { formspreeSentAt: new Date() },
      });
    } catch (error) {
      delivered = false;
      console.error(
        "Formspree was sent but delivery status could not be saved for lead",
        lead.id,
        error,
      );
    }
  } else console.error("Formspree did not accept lead", lead.id);

  return NextResponse.json(
    { ok: true, notificationSent: delivered },
    { status: 201 },
  );
}

function nowIsTooSoon(startedAt: number) {
  const elapsed = Date.now() - startedAt;
  return elapsed < 1200 || elapsed > 24 * 60 * 60 * 1000;
}

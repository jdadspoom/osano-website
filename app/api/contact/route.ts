import nodemailer from "nodemailer";

export const runtime = "nodejs";

type Enquiry = {
  name: string;
  email: string;
  phone: string;
  contactMethod: string;
  topic: string;
  environment: string;
  message: string;
  consent: boolean;
  website?: string;
};

const attempts = new Map<string, number[]>();
const RATE_WINDOW = 10 * 60 * 1000;
const RATE_LIMIT = 5;

const clean = (value: unknown, max: number) => typeof value === "string" ? value.trim().slice(0, max) : "";
const escapeHtml = (value: string) => value.replace(/[&<>'"]/g, character => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[character] ?? character);

function clientIp(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

function limited(ip: string) {
  const now = Date.now();
  const recent = (attempts.get(ip) ?? []).filter(timestamp => now - timestamp < RATE_WINDOW);
  if (recent.length >= RATE_LIMIT) return true;
  recent.push(now);
  attempts.set(ip, recent);
  return false;
}

export async function POST(request: Request) {
  if (Number(request.headers.get("content-length") ?? 0) > 20_000) return Response.json({ message: "Request is too large." }, { status: 413 });

  let source: Partial<Enquiry>;
  try { source = await request.json(); }
  catch { return Response.json({ message: "Invalid request." }, { status: 400 }); }

  const enquiry: Enquiry = {
    name: clean(source.name, 100),
    email: clean(source.email, 160).toLowerCase(),
    phone: clean(source.phone, 50),
    contactMethod: clean(source.contactMethod, 30),
    topic: clean(source.topic, 100),
    environment: clean(source.environment, 160),
    message: clean(source.message, 4000),
    consent: source.consent === true,
    website: clean(source.website, 200),
  };

  // Bots commonly fill this hidden field; return success without sending.
  if (enquiry.website) return Response.json({ ok: true });
  if (limited(clientIp(request))) return Response.json({ message: "Too many enquiries. Please wait a few minutes and try again." }, { status: 429 });

  if (!enquiry.name || !enquiry.phone || !enquiry.topic || !enquiry.message || !enquiry.consent || !/^\S+@\S+\.\S+$/.test(enquiry.email)) {
    return Response.json({ message: "Please check all required fields and try again." }, { status: 400 });
  }

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const recipient = process.env.CONTACT_TO_EMAIL;
  const sender = process.env.CONTACT_FROM_EMAIL || user;
  if (!host || !user || !pass || !recipient || !sender) {
    return Response.json({ message: "The enquiry service is not configured yet. Please contact us by email or phone." }, { status: 503 });
  }

  const receivedAt = new Date().toISOString();
  const safe = Object.fromEntries(Object.entries(enquiry).map(([key, value]) => [key, escapeHtml(String(value))])) as Record<string, string>;
  const transporter = nodemailer.createTransport({ host, port, secure: process.env.SMTP_SECURE === "true" || port === 465, auth: { user, pass } });

  try {
    await transporter.sendMail({
      from: sender,
      to: recipient,
      replyTo: enquiry.email,
      subject: `OSANO enquiry: ${enquiry.topic}`,
      text: [`Name: ${enquiry.name}`, `Email: ${enquiry.email}`, `Phone: ${enquiry.phone}`, `Preferred contact: ${enquiry.contactMethod}`, `Environment: ${enquiry.environment || "-"}`, `Consent: accepted at ${receivedAt}`, "", enquiry.message].join("\n"),
      html: `<h2>New OSANO enquiry</h2><table cellpadding="7" cellspacing="0"><tr><td><b>Name</b></td><td>${safe.name}</td></tr><tr><td><b>Email</b></td><td>${safe.email}</td></tr><tr><td><b>Phone</b></td><td>${safe.phone}</td></tr><tr><td><b>Preferred contact</b></td><td>${safe.contactMethod}</td></tr><tr><td><b>Topic</b></td><td>${safe.topic}</td></tr><tr><td><b>Environment</b></td><td>${safe.environment || "-"}</td></tr></table><h3>Message</h3><p>${safe.message.replace(/\n/g, "<br>")}</p><hr><small>Consent accepted at ${receivedAt}</small>`,
    });
    return Response.json({ ok: true });
  } catch {
    return Response.json({ message: "We could not send your enquiry right now. Please try again shortly." }, { status: 502 });
  }
}

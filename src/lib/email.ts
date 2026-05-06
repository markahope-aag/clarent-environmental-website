import { Resend } from "resend";
import { env } from "@/lib/env";

function getClient() {
  if (!env.RESEND_API_KEY) return null;
  return new Resend(env.RESEND_API_KEY);
}

export interface EmailPayload {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
  replyTo?: string;
}

export async function sendEmail(payload: EmailPayload): Promise<void> {
  const resend = getClient();
  if (!resend) {
    console.warn("[email] No RESEND_API_KEY — skipping send");
    return;
  }

  const { error } = await resend.emails.send({
    from: payload.from ?? env.RESEND_FROM_ADDRESS,
    to: payload.to,
    subject: payload.subject,
    html: payload.html,
    ...(payload.replyTo && { replyTo: payload.replyTo }),
  });

  if (error) throw new Error(`Resend error: ${error.message}`);
}

// Standard lead notification template
export function leadNotificationHtml(lead: {
  email: string;
  company?: string | undefined;
  state?: string | undefined;
  wasteType?: string | undefined;
}) {
  return `
    <h2>New lead — Clarent Environmental</h2>
    <p><strong>Email:</strong> ${lead.email}</p>
    ${lead.company   ? `<p><strong>Company:</strong> ${lead.company}</p>` : ""}
    ${lead.state     ? `<p><strong>State:</strong> ${lead.state}</p>` : ""}
    ${lead.wasteType ? `<p><strong>Waste type:</strong> ${lead.wasteType}</p>` : ""}
  `;
}

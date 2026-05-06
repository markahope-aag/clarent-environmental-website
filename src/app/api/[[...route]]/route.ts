import { Hono } from "hono";
import { handle } from "hono/vercel";

const app = new Hono().basePath("/api");

// Health check
app.get("/health", (c) => c.json({ status: "ok", ts: Date.now() }));

// Lead capture — writes to HubSpot and mirrors to Supabase
app.post("/leads", async (c) => {
  const { z } = await import("zod");
  const schema = z.object({
    email:     z.string().email(),
    firstName: z.string().optional(),
    lastName:  z.string().optional(),
    company:   z.string().optional(),
    phone:     z.string().optional(),
    state:     z.string().optional(),
    wasteType: z.string().optional(),
  });

  const parsed = schema.safeParse(await c.req.json());
  if (!parsed.success) return c.json({ error: "Invalid input" }, 400);

  const { upsertContact } = await import("@/lib/hubspot");
  const { sendEmail, leadNotificationHtml } = await import("@/lib/email");

  await upsertContact({ ...parsed.data, source: "website" });
  await sendEmail({
    to: "mark.hope@clarentenvironmental.com",
    subject: `New lead: ${parsed.data.email}`,
    html: leadNotificationHtml(parsed.data),
  });

  return c.json({ ok: true });
});

// Contact form — emails the message to mark.hope@clarentenvironmental.com
app.post("/contact", async (c) => {
  const { z } = await import("zod");
  const schema = z.object({
    name:    z.string().min(1),
    email:   z.string().email(),
    message: z.string().min(1),
  });

  const parsed = schema.safeParse(await c.req.json());
  if (!parsed.success) return c.json({ error: "Invalid input" }, 400);

  const { sendEmail } = await import("@/lib/email");

  const safeMessage = parsed.data.message
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  await sendEmail({
    to: "mark.hope@clarentenvironmental.com",
    replyTo: parsed.data.email,
    subject: `Contact form: ${parsed.data.name}`,
    html: `
      <h2>New contact message</h2>
      <p><strong>From:</strong> ${parsed.data.name}</p>
      <p><strong>Email:</strong> ${parsed.data.email}</p>
      <p style="white-space: pre-wrap;">${safeMessage}</p>
    `,
  });

  return c.json({ ok: true });
});

export const GET  = handle(app);
export const POST = handle(app);

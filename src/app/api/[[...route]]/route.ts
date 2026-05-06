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

export const GET  = handle(app);
export const POST = handle(app);

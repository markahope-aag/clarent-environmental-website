import { Hono } from "hono";

const app = new Hono().basePath("/api");

app.get("/health", (c) =>
  c.json({ ok: true, service: "clarent-environmental-website", ts: Date.now() })
);

const handler = (request: Request) => app.fetch(request);

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
export const OPTIONS = handler;
export const HEAD = handler;

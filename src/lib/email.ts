import { Resend } from "resend";
import { requireEnv } from "@/lib/env";

let cachedResend: Resend | null = null;

function getResend(): Resend {
  if (!cachedResend) {
    cachedResend = new Resend(requireEnv("RESEND_API_KEY"));
  }
  return cachedResend;
}

export interface SendTransactionalArgs {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  from?: string;
  replyTo?: string;
}

export interface SendTransactionalResult {
  id: string;
}

export async function sendTransactional(args: SendTransactionalArgs): Promise<SendTransactionalResult> {
  if (!args.html && !args.text) {
    throw new Error("sendTransactional requires html or text content");
  }

  const resend = getResend();
  const result = await resend.emails.send({
    from: args.from ?? requireEnv("RESEND_FROM_ADDRESS"),
    to: args.to,
    subject: args.subject,
    html: args.html ?? "",
    ...(args.text !== undefined ? { text: args.text } : {}),
    ...(args.replyTo !== undefined ? { replyTo: args.replyTo } : {}),
  });

  if (result.error) {
    throw new Error(`Resend error: ${result.error.message}`);
  }
  if (!result.data) {
    throw new Error("Resend returned no data");
  }

  return { id: result.data.id };
}

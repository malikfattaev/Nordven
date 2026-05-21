import { NextResponse } from "next/server";
import { z } from "zod";
import { locales } from "@/i18n/routing";
import { contactInterestSlugs } from "@/content/services";
import { deliverLead } from "@/lib/leads";

const payloadSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(240),
  company: z.string().trim().max(160).optional(),
  serviceInterest: z.enum(contactInterestSlugs).optional(),
  message: z.string().trim().min(10).max(5000),
  locale: z.enum(locales),
});

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = payloadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "validation_failed", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const result = await deliverLead(parsed.data);
  if (!result.ok) {
    return NextResponse.json({ ok: false, error: "delivery_failed", reason: result.reason }, { status: 500 });
  }
  return NextResponse.json({ ok: true, forwarded: result.forwarded }, { status: 201 });
}

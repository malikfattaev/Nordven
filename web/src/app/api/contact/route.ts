import { NextResponse } from "next/server";
import { z } from "zod";
import { serverEnv } from "@/lib/env";
import { locales } from "@/i18n/routing";
import { serviceSlugs } from "@/content/services";

const payloadSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(240),
  company: z.string().trim().max(160).optional(),
  serviceInterest: z.enum(serviceSlugs).optional(),
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

  if (!serverEnv.DATABASE_URL) {
    console.warn("[contact] DATABASE_URL not configured; skipping persistence");
    return NextResponse.json({ ok: true, persisted: false }, { status: 202 });
  }

  try {
    const { db, schema } = await import("@/db/client");
    await db.insert(schema.leads).values({
      name: parsed.data.name,
      email: parsed.data.email,
      company: parsed.data.company,
      serviceInterest: parsed.data.serviceInterest,
      message: parsed.data.message,
      locale: parsed.data.locale,
    });
    return NextResponse.json({ ok: true, persisted: true }, { status: 201 });
  } catch (error) {
    console.error("[contact] failed to persist lead", error);
    return NextResponse.json({ ok: false, error: "persist_failed" }, { status: 500 });
  }
}

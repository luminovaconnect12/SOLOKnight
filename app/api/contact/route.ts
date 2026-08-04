import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";

export async function POST(request: Request) {
  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 }); }
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ ok: false, error: "Validation failed.", issues: parsed.error.issues }, { status: 422 });
  console.log("[contact] new submission", { name: parsed.data.name, company: parsed.data.company, email: parsed.data.email, industry: parsed.data.industry });
  return NextResponse.json({ ok: true });
}

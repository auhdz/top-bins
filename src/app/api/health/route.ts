import { NextResponse } from "next/server";

/**
 * Deployment smoke check: verifies required env vars are set (values are never returned).
 * GET /api/health — use after configuring Vercel or another host.
 */
export async function GET() {
  const checks = {
    NEXT_PUBLIC_SITE_URL: Boolean(process.env.NEXT_PUBLIC_SITE_URL?.trim()),
    STRIPE_SECRET_KEY: Boolean(process.env.STRIPE_SECRET_KEY?.trim()),
    STRIPE_WEBHOOK_SECRET: Boolean(process.env.STRIPE_WEBHOOK_SECRET?.trim()),
    DATABASE_URL: Boolean(process.env.DATABASE_URL?.trim()),
  };
  const ok = Object.values(checks).every(Boolean);
  return NextResponse.json({ ok, checks }, { status: 200 });
}

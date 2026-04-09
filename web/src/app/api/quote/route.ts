import { NextResponse } from "next/server";

type Body = {
  name?: string;
  email?: string;
  phone?: string;
  zip?: string;
  startDate?: string;
  products?: string;
  message?: string;
  company?: string;
};

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  if (body.company) {
    return NextResponse.json({ ok: true });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const zip = body.zip?.trim();

  if (!name || !email || !zip) {
    return NextResponse.json({ ok: false, error: "Name, email, and ZIP are required." }, { status: 400 });
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) {
    return NextResponse.json({ ok: false, error: "Enter a valid email address." }, { status: 400 });
  }

  const payload = {
    name,
    email,
    phone: body.phone?.trim() || null,
    zip,
    startDate: body.startDate?.trim() || null,
    message: body.message?.trim() || null,
    products: body.products?.trim() || null,
  };

  if (process.env.DATABASE_URL) {
    try {
      const { prisma } = await import("@/lib/prisma");
      await prisma.quoteRequest.create({ data: payload });
    } catch (e) {
      console.error("[quote] database error", e);
      return NextResponse.json(
        { ok: false, error: "We could not save your request. Try again or call us." },
        { status: 503 }
      );
    }
  } else {
    console.info("[quote] DATABASE_URL not set; quote request (not persisted):", payload);
  }

  return NextResponse.json({ ok: true });
}

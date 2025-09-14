import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_JIKAN_API_URL!;

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Missing details." }, { status: 400 });
    }

    return NextResponse.json({ success: true, data: info });
  } catch (error) {
    console.error("Error creating recommendation:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

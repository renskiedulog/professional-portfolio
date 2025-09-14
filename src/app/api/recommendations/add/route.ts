import { NextRequest, NextResponse } from "next/server";
import { sanityClient } from "@/lib/sanityClient";

export async function POST(req: NextRequest) {
  try {
    const { id, type, title, image } = await req.json();

    if (!id || !type || !title || !image) {
      return NextResponse.json({ error: "Missing details." }, { status: 400 });
    }

    // Create a new "recommendations" document
    const newRecommendation = {
      id: String(id),
      _type: "recommendations",
      title,
      type,
      image,
    };

    await sanityClient.create(newRecommendation);

    return NextResponse.json({ success: true, data: newRecommendation });
  } catch (error) {
    console.error("Error creating recommendation:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

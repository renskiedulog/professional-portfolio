import { NextRequest, NextResponse } from "next/server";
import { sanityClient } from "@/lib/sanityClient";

export async function POST(req: NextRequest) {
  try {
    const { id, type, title, image } = await req.json();

    if (!id || !type || !title || !image) {
      return NextResponse.json({ error: "Missing details." }, { status: 400 });
    }

    const query = `
      *[_type == "recommendations" && id == $id && type == $type][0]{
        _id, id, type, title
      }
    `;

    const existing = await sanityClient.fetch(query, {
      id: String(id),
      type,
      title,
    });

    if (existing) {
      return NextResponse.json(
        {
          error: "Duplicate recommendation found. Cannot create duplicate.",
          existing,
        },
        { status: 409 }
      );
    }

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

import { sanityClient } from "@/lib/sanityClient";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const recommendations = await sanityClient.fetch(
      `*[_type == "recommendations"] | order(_createdAt desc){
        _id,
        id,
        title,
        type
      }`
    );
    return NextResponse.json({ recommendations });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch recommendations." },
      { status: 500 }
    );
  }
}

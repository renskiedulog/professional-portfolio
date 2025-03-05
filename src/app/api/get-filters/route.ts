import { NextResponse } from "next/server";
import { groq } from "next-sanity";
import { sanityClient } from "@/lib/sanityClient";

export async function GET() {
  try {
    const query = groq`
    *[_type == "category"] | order(title asc)[].title
  `;

    const categories = await sanityClient.fetch(query);
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

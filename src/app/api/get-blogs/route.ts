import { NextResponse } from "next/server";
import { groq } from "next-sanity";
import { sanityClient } from "@/lib/sanityClient";

export async function GET() {
  try {
    const query = groq`
      *[_type == "blog"] | order(publishedAt desc) {
        _id,
        title,
        description,
        "slug": slug.current,
        "author": {
          "name": author->name,
          "image": author->image.asset->url,
        },
        publishedAt,
        "mainImage": mainImage.asset->url,
        "categories": categories[]->{
          _id,
          title,
          slug
        },
      }
    `;

    const blogs = await sanityClient.fetch(query);
    return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}

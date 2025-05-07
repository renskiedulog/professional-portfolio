// app/api/increment-view/route.ts
import { NextRequest, NextResponse } from "next/server";
import { sanityClient } from "@/lib/sanityClient";
import { groq } from "next-sanity";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const slug = url.searchParams.get("slug");

    if (!slug) {
      return NextResponse.json({ error: "Missing slug" }, { status: 400 });
    }

    const getQuery = groq`*[_type == "blog" && slug.current == "${slug}"][0]{ _id, viewCount }`;
    const blog = await sanityClient.fetch(getQuery, { slug });

    if (!blog?._id) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    // Increment the view count
    const patch = sanityClient
      .patch(blog._id)
      .setIfMissing({ viewCount: 0 })
      .inc({ viewCount: 1 });
    await sanityClient.transaction().patch(patch).commit();

    console.log(patch);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error incrementing view:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

import { sanityClient } from "@/lib/sanityClient";
import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(req: NextRequest) {
  try {
    const { _id, favorite } = await req.json();

    if (!_id) {
      return NextResponse.json({ error: "Missing _id." }, { status: 400 });
    }

    await sanityClient.patch(_id).set({ favorite: !!favorite }).commit();

    revalidateTag("recommendations");

    return NextResponse.json({ success: true, favorite: !!favorite });
  } catch (error) {
    console.error("Error toggling favorite:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { sanityClient } from "@/lib/sanityClient";
import { revalidateTag } from "next/cache";

export async function POST(req: Request) {
  try {
    const { ids } = await req.json();
    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: "No IDs provided" }, { status: 400 });
    }

    // Bulk delete recommendations by IDs
    const mutations = ids.map((id: string) => ({
      delete: { id },
    }));

    await sanityClient.mutate(mutations);

    revalidateTag("recommendations");

    return NextResponse.json({ success: true });
  } catch (error) {
    let message = "Failed to delete";
    if (error && typeof error === "object" && "message" in error) {
      message = (error as any).message;
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

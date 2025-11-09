import { NextRequest, NextResponse } from "next/server";
import { sanityClient } from "@/lib/sanityClient";

async function uploadPhoto(base64?: string) {
  if (!base64 || !base64.startsWith("data:image")) return null; // skip non-base64 or empty

  const base64Data = base64.split(",")[1];
  const buffer = Buffer.from(base64Data, "base64");
  const uploaded = await sanityClient.assets.upload("image", buffer, {
    contentType: "image/png",
    filename: "testimonial-photo",
  });
  return uploaded._id;
}

export async function POST(req: NextRequest) {
  try {
    const form = await req.json();
    let photoRef: string | null = null;

    photoRef = await uploadPhoto(form.photo);

    await sanityClient.create({
      _type: "testimonial",
      name: form.name,
      github: form.github,
      position: form.position,
      testimonial: form.testimonial,
      linkedin: form.linkedin,
      portfolio: form.portfolio,
      shown: false,
      ...(photoRef && {
        photo: {
          _type: "image",
          asset: { _type: "reference", _ref: photoRef },
        },
      }),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: (err as Error).message });
  }
}

import { sanityClient } from "@/lib/sanityClient";

export const POST = async (req: Request) => {
  const body = await req.json();
  const { email, gameplan, message } = body;

  const ip = req.headers.get("x-forwarded-for") || req.socket.remoteAddress;

  const today = new Date().toISOString().split("T")[0];

  try {
    const existingSubmission = await sanityClient.fetch(
      `*[_type == "formSubmissions" && ip == $ip && lastSubmittedDate == $today][0]`,
      { ip, today }
    );

    if (existingSubmission) {
      return Response.json({
        success: false,
        message: "You've already submitted today. Please try again tomorrow.",
        status: 429,
      });
    }

    const doc = {
      _type: "formSubmissions",
      email,
      gameplan,
      message,
      ip,
      lastSubmittedDate: today,
      submittedAt: new Date().toISOString(),
    };

    await sanityClient.create(doc);

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Form submission error:", error);
    return Response.json({
      success: false,
      message: "An error occurred while submitting the form.",
      status: 500,
    });
  }
};

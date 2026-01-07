import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    // Optional but recommended security check
    const signature = req.headers.get("x-sanity-signature");
    if (signature !== process.env.SANITY_WEBHOOK_SECRET) {
      return NextResponse.json({ ok: false }, { status: 401 });
    }

    const body = await req.json();

    if (!body?._type) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    switch (body._type) {
      case "formSubmissions":
        await sendFormSubmissionEmail(body);
        break;

      case "testimonial":
        await sendTestimonialEmail(body);
        break;

      default:
        return NextResponse.json({ ignored: true });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Sanity webhook error:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

async function sendFormSubmissionEmail(data: any) {
  const { email, gameplan, message, _createdAt } = data;

  await resend.emails.send({
    from: "Website Alerts <alerts@yourdomain.com>",
    to: [process.env.ALERT_EMAIL!],
    subject: "📬 New Contact Form Submission",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>New Contact Form Submission</h2>

        <p><strong>Email:</strong><br />${email || "N/A"}</p>
        <p><strong>Game Plan:</strong><br />${gameplan || "N/A"}</p>

        <p><strong>Message:</strong></p>
        <pre style="background:#f5f5f5;padding:12px;border-radius:6px;">
${message || "(empty)"}
        </pre>

        <hr />

        <small>Submitted at: ${_createdAt}</small>
      </div>
    `,
  });
}

async function sendTestimonialEmail(data: any) {
  const { name, github, testimonial, _createdAt } = data;

  await resend.emails.send({
    from: "Website Alerts <alerts@yourdomain.com>",
    to: [process.env.ALERT_EMAIL!],
    subject: "⭐ New Testimonial Submitted",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>New Testimonial Submitted</h2>

        <p><strong>Name:</strong><br />${name || "N/A"}</p>
        <p><strong>GitHub:</strong><br />
          ${
            github ? `<a href="${github}" target="_blank">${github}</a>` : "N/A"
          }
        </p>

        <p><strong>Testimonial:</strong></p>
        <blockquote style="border-left:4px solid #ddd;padding-left:12px;">
          ${testimonial || "(empty)"}
        </blockquote>

        <hr />

        <small>Submitted at: ${_createdAt}</small>
      </div>
    `,
  });
}

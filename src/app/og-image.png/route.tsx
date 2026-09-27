import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

// 1200x630 social preview, rendered once at build time
export const dynamic = "force-static";

export async function GET() {
  // Satori can't decode webp, convert the portrait to png first
  const portrait = await sharp(
    await readFile(path.join(process.cwd(), "public", "me.webp"))
  )
    .resize(360, 360)
    .png()
    .toBuffer();
  const portraitSrc = `data:image/png;base64,${portrait.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 90px",
          background: "#0a0a0a",
          color: "#fafafa",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 640 }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05 }}>
            Renato Dulog
          </div>
          <div style={{ fontSize: 38, marginTop: 20, color: "#d4d4d4" }}>
            Full-Stack Web Developer
          </div>
          <div style={{ fontSize: 28, marginTop: 28, color: "#a3a3a3" }}>
            React · Next.js · TypeScript
          </div>
          <div style={{ fontSize: 28, marginTop: 8, color: "#a3a3a3" }}>
            Cebu, Philippines
          </div>
          <div style={{ fontSize: 24, marginTop: 48, color: "#737373" }}>
            renato-dulog.is-a.dev
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={portraitSrc}
          width={360}
          height={360}
          style={{ borderRadius: 9999, border: "6px solid #262626" }}
          alt=""
        />
      </div>
    ),
    { width: 1200, height: 630 }
  );
}

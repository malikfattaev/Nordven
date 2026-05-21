import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Nordven | Software Lab";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "radial-gradient(circle at 0% 0%, #c3d8ef 0%, transparent 55%)," +
            "radial-gradient(circle at 100% 0%, #fbe1d0 0%, transparent 55%)," +
            "radial-gradient(circle at 0% 100%, #d8edde 0%, transparent 55%)," +
            "radial-gradient(circle at 100% 100%, #e6deef 0%, transparent 55%)," +
            "#fbf8f3",
          color: "#161513",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 28,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#5b574f",
          }}
        >
          <span style={{ width: 36, height: 1, background: "#5b574f", display: "block" }} />
          Software Lab
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          <div style={{ fontSize: 152, lineHeight: 1, fontWeight: 500, letterSpacing: "-0.02em" }}>
            Nordven
          </div>
          <div
            style={{
              fontSize: 38,
              lineHeight: 1.2,
              color: "#5b574f",
              maxWidth: 880,
            }}
          >
            Websites, ERP & CRM, and AI solutions. Senior engineering, calm and durable software.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 24,
            color: "#5b574f",
          }}
        >
          <span>nordvenlab.com</span>
          <span>EN · ES</span>
        </div>
      </div>
    ),
    { ...size },
  );
}

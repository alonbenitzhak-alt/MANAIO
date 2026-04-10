import { ImageResponse } from "next/og";

export const alt = "MANAIO - השקעות נדל\"ן גלובליות";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #1e3a5f 0%, #0f2744 50%, #0a1929 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -80,
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "rgba(59, 130, 246, 0.15)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -60,
            left: -60,
            width: 250,
            height: 250,
            borderRadius: "50%",
            background: "rgba(16, 185, 129, 0.12)",
            display: "flex",
          }}
        />

        {/* Logo text */}
        <div
          style={{
            fontSize: 80,
            fontWeight: 800,
            color: "white",
            letterSpacing: "6px",
            marginBottom: 20,
            display: "flex",
          }}
        >
          MANAIO
        </div>

        {/* Divider */}
        <div
          style={{
            width: 120,
            height: 4,
            background: "linear-gradient(90deg, #3b82f6, #10b981)",
            borderRadius: 2,
            marginBottom: 30,
            display: "flex",
          }}
        />

        {/* Tagline */}
        <div
          style={{
            fontSize: 32,
            color: "#94a3b8",
            marginBottom: 16,
            display: "flex",
          }}
        >
          Global Real Estate Investment Platform
        </div>

        <div
          style={{
            fontSize: 28,
            color: "#64748b",
            display: "flex",
          }}
        >
          פלטפורמת השקעות נדל״ן בינלאומית למשקיעים ישראלים
        </div>

        {/* Countries */}
        <div
          style={{
            display: "flex",
            gap: 24,
            marginTop: 40,
          }}
        >
          {["Greece", "Cyprus"].map((country) => (
            <div
              key={country}
              style={{
                padding: "10px 28px",
                borderRadius: 30,
                border: "1px solid rgba(148, 163, 184, 0.3)",
                color: "#cbd5e1",
                fontSize: 20,
                display: "flex",
              }}
            >
              {country}
            </div>
          ))}
        </div>

        {/* Bottom URL */}
        <div
          style={{
            position: "absolute",
            bottom: 30,
            fontSize: 18,
            color: "#475569",
            display: "flex",
          }}
        >
          mymanaio.com
        </div>
      </div>
    ),
    { ...size }
  );
}

import { ImageResponse } from "next/og";

export const alt = "Patrick David Pagdatoon — Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0b1f3a 0%, #12314e 60%, #0b1f3a 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <p
          style={{
            color: "#5c86b3",
            fontSize: 20,
            letterSpacing: 6,
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          Newark, NJ · NJIT
        </p>
        <h1
          style={{
            color: "#f7fbff",
            fontSize: 72,
            fontWeight: 700,
            margin: "16px 0 8px",
            lineHeight: 1.1,
          }}
        >
          Patrick David Pagdatoon
        </h1>
        <p style={{ color: "#00a3d4", fontSize: 28, margin: 0 }}>
          IT Student · Full-Stack Developer · UX
        </p>
        <p style={{ color: "#a8c5d9", fontSize: 20, marginTop: 32 }}>
          Available for internships — May 2027
        </p>
      </div>
    ),
    size,
  );
}
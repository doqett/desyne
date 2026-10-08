import { ImageResponse } from "next/og";
import { logoMark } from "@/components/logo";
import { loadOgFonts } from "@/lib/og-font";

/** Open Graph art for the landing pages: 1200×630, dark, Desyne mark. */
export const ogSize = { width: 1200, height: 630 };

export async function marketingOgImage({
  headline,
  dim,
  sub,
}: {
  headline: string;
  /** Second line, dimmed like the site's headings. */
  dim?: string;
  sub: string;
}) {
  const host = "desyne.dev";
  const fonts = await loadOgFonts(`Desyne${headline}${dim ?? ""}${sub}${host}`);
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        background: "#0a0a0b",
        backgroundImage:
          "radial-gradient(60% 80% at 85% 0%, rgba(99,102,241,0.38), transparent 70%), radial-gradient(40% 60% at 0% 100%, rgba(99,102,241,0.14), transparent 70%)",
        color: "#fafafa",
        fontFamily: "Inter",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <svg
          width="56"
          height="56"
          viewBox={logoMark.viewBox}
          role="img"
          aria-label={"Desyne"}
        >
          <path d={logoMark.stem} fill="#fafafa" />
          <path d={logoMark.bowl} fill="rgb(129,140,248)" />
        </svg>
        <span style={{ fontSize: 40, fontWeight: 600, letterSpacing: -1 }}>
          Desyne
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 76,
            fontWeight: 600,
            lineHeight: 1.04,
            letterSpacing: -3,
          }}
        >
          <span>{headline}</span>
          {dim && <span style={{ color: "rgba(250,250,250,0.5)" }}>{dim}</span>}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: 40,
            marginTop: 40,
            fontSize: 28,
            fontWeight: 500,
            color: "rgba(250,250,250,0.62)",
          }}
        >
          <span style={{ maxWidth: 820 }}>{sub}</span>
          <span style={{ color: "rgb(165,180,252)" }}>{host}</span>
        </div>
      </div>
    </div>,
    { ...ogSize, fonts },
  );
}

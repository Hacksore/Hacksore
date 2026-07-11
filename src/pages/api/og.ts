import type { APIRoute } from "astro";

const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 420;
const PADDING_X = 64;
const TITLE_FONT_SIZE = 36;
const LINE_HEIGHT = 52;
// Rough average character width for the title font at TITLE_FONT_SIZE
const CHAR_WIDTH = 19;
const MAX_CHARS_PER_LINE = Math.floor((CANVAS_WIDTH - PADDING_X * 2) / CHAR_WIDTH);
const MAX_TITLE_LINES = 3;

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function wrapText(text: string): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length <= MAX_CHARS_PER_LINE) {
      current = candidate;
    } else {
      if (current) lines.push(current);
      current = word.length > MAX_CHARS_PER_LINE ? `${word.slice(0, MAX_CHARS_PER_LINE - 1)}…` : word;
    }
  }
  if (current) lines.push(current);

  const capped = lines.slice(0, MAX_TITLE_LINES);
  if (lines.length > MAX_TITLE_LINES) {
    const last = capped[MAX_TITLE_LINES - 1];
    capped[MAX_TITLE_LINES - 1] = `${last.slice(0, -1)}…`;
  }
  return capped;
}

/** Derive a consistent hue (0–359) from a string. */
function titleHue(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  }
  return hash % 360;
}

export const GET: APIRoute = ({ url }) => {
  const title = url.searchParams.get("title") ?? "Untitled";
  const tags = url.searchParams
    .get("tags")
    ?.split(",")
    .map((t) => t.trim())
    .filter(Boolean)
    .slice(0, 4) ?? [];

  const hue = titleHue(title);
  const accentColor = `hsl(${hue}, 70%, 55%)`;
  const accentDim = `hsl(${hue}, 50%, 25%)`;
  const gradientEnd = `hsl(${(hue + 40) % 360}, 20%, 8%)`;

  const lines = wrapText(title);
  const textBlockHeight = lines.length * LINE_HEIGHT;
  const tagsAreaHeight = tags.length > 0 ? 44 : 0;
  // Vertically center the title + tags block
  const titleStartY =
    (CANVAS_HEIGHT - textBlockHeight - tagsAreaHeight) / 2 + TITLE_FONT_SIZE;

  const titleSvg = lines
    .map((line, i) => {
      const y = titleStartY + i * LINE_HEIGHT;
      return `<text x="${PADDING_X}" y="${y}" font-family="-apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,sans-serif" font-size="${TITLE_FONT_SIZE}" font-weight="700" fill="white" letter-spacing="-0.5">${escapeXml(line)}</text>`;
    })
    .join("\n    ");

  let tagsSvg = "";
  if (tags.length > 0) {
    const tagsY = titleStartY + textBlockHeight + 8;
    let offsetX = PADDING_X;
    const tagElements: string[] = [];
    for (const tag of tags) {
      const label = `#${tag}`;
      const labelWidth = label.length * 9 + 20;
      tagElements.push(
        `<rect x="${offsetX}" y="${tagsY}" width="${labelWidth}" height="26" rx="4" fill="rgba(255,255,255,0.08)"/>` +
          `<text x="${offsetX + 10}" y="${tagsY + 17}" font-family="-apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,sans-serif" font-size="13" fill="rgba(255,255,255,0.55)">${escapeXml(label)}</text>`,
      );
      offsetX += labelWidth + 8;
    }
    tagsSvg = tagElements.join("\n    ");
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${CANVAS_WIDTH}" height="${CANVAS_HEIGHT}" viewBox="0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1" gradientUnits="objectBoundingBox">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="${gradientEnd}"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
      <stop offset="0%" stop-color="${accentColor}"/>
      <stop offset="100%" stop-color="${accentDim}"/>
    </linearGradient>
    <pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1" fill="rgba(255,255,255,0.04)"/>
    </pattern>
  </defs>
  <rect width="${CANVAS_WIDTH}" height="${CANVAS_HEIGHT}" fill="url(#bg)"/>
  <rect width="${CANVAS_WIDTH}" height="${CANVAS_HEIGHT}" fill="url(#dots)"/>
  <rect x="0" y="0" width="5" height="${CANVAS_HEIGHT}" fill="url(#accent)"/>
  ${titleSvg}
  ${tagsSvg}
</svg>`;

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
    },
  });
};

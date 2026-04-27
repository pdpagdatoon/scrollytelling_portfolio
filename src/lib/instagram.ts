export function getInstagramEmbedUrl(url: string): string | null {
  try {
    const parsedUrl = new URL(url);
    const segments = parsedUrl.pathname.split("/").filter(Boolean);

    if (segments.length < 2) {
      return null;
    }

    const contentType = segments[0];
    const shortcode = segments[1];

    if (!["p", "reel", "tv"].includes(contentType) || !shortcode) {
      return null;
    }

    return `https://www.instagram.com/${contentType}/${shortcode}/embed`;
  } catch {
    return null;
  }
}

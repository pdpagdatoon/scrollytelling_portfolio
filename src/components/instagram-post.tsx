import { getInstagramEmbedUrl } from "@/lib/instagram";

interface InstagramPostProps {
  url: string;
}

export function InstagramPost({ url }: InstagramPostProps) {
  const embedUrl = getInstagramEmbedUrl(url);

  if (!embedUrl) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="inline-flex rounded-lg border border-white/20 bg-white/8 px-4 py-2 text-xs font-semibold tracking-wide text-[var(--color-accent-1)] transition-colors hover:border-white/40 hover:bg-white/12"
      >
        View Instagram Post
      </a>
    );
  }

  return (
    <iframe
      src={embedUrl}
      title="Instagram post"
      className="h-[600px] w-full rounded-lg border border-white/10 bg-[var(--color-card-bg)]"
      loading="lazy"
    />
  );
}

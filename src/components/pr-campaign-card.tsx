import Image from "next/image";
import type { PrCampaign } from "@/types/portfolio";

interface PrCampaignCardProps {
  campaign: PrCampaign;
}

export function PrCampaignCard({ campaign }: PrCampaignCardProps) {
  const primaryImage = campaign.postImages[0];

  return (
    <article className="rounded-2xl border border-white/10 bg-[var(--color-card-bg)] p-6 backdrop-blur-md">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        {primaryImage ? (
          <div className="relative mx-auto h-24 w-24 flex-shrink-0 overflow-hidden rounded-full border border-white/10 bg-white/5 sm:mx-0 sm:h-28 sm:w-28">
            <Image
              src={primaryImage}
              alt={`${campaign.organization} logo`}
              fill
              className="object-cover"
              sizes="112px"
            />
          </div>
        ) : null}

        <div className="space-y-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-2)]">
              {campaign.organization}
            </p>
            <h3 className="mt-2 text-lg font-semibold text-[var(--color-paper)]">{campaign.title}</h3>
            <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">{campaign.summary}</p>
          </div>

          <ul className="space-y-1.5 text-sm leading-6 text-[var(--color-muted)]">
            {campaign.outcomes.map((outcome) => (
              <li key={outcome} className="flex gap-2"><span className="text-[var(--color-accent-1)] flex-shrink-0">+</span><span>{outcome}</span></li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

import type { PrCampaign } from "@/types/portfolio";

interface PrCampaignCardProps {
  campaign: PrCampaign;
}

export function PrCampaignCard({ campaign }: PrCampaignCardProps) {
  return (
    <article className="space-y-4 rounded-2xl border border-white/10 bg-[var(--color-card-bg)] p-6 backdrop-blur-md">
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
    </article>
  );
}

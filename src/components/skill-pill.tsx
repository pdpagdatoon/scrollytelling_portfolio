interface SkillPillProps {
  skill: string;
}

export function SkillPill({ skill }: SkillPillProps) {
  return (
    <span className="inline-flex rounded-full border border-white/20 bg-white/8 px-3 py-1.5 text-xs font-medium tracking-wide text-[var(--color-accent-2)] transition-colors duration-200 hover:border-white/30 hover:bg-white/12">
      {skill}
    </span>
  );
}
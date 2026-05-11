import type { SkillGroup as SkillGroupData } from "@/types/portfolio";
import { SkillPill } from "./skill-pill";

interface SkillGroupProps {
  group: SkillGroupData;
}

export function SkillGroup({ group }: SkillGroupProps) {
  return (
    <div className="space-y-4 border-t border-white/10 pt-4">
      <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent-2)]">
        {group.category}
      </p>
      <div className="flex flex-wrap gap-2">
        {group.skills.map((skill) => (
          <SkillPill key={skill} skill={skill} />
        ))}
      </div>
    </div>
  );
}
// features/skills/components/SkillsPreview.tsx
"use client";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useSelectedSection } from "@/contexts/section-context";
import { useDraftPreview } from "@/contexts/draft-preview-context";
import { EMPTY_SKILL_DRAFT, SkillDraft } from "./type";
import SkillsSection from "@/app/(root)/components/skills-section";

export function SkillsPreview() {
  const skills = useQuery(api.skill.list) ?? [];
  const { selectedItemId, setSelectedItemId } = useSelectedSection();
  const { getDraft } = useDraftPreview();

  const isNew = selectedItemId === null || selectedItemId === "new";
  const draft = getDraft<SkillDraft>('skills', EMPTY_SKILL_DRAFT);

  const previewSkills = isNew
    ? [...skills]
    : skills.map((s) => (s._id === selectedItemId ? { ...s, ...draft } : s));

  return <SkillsSection skills={previewSkills} onSkillClick={(id) => setSelectedItemId(id)} />;
}
import { Doc, Id } from "@/convex/_generated/dataModel";

export interface SkillDraft {
_id: Id<"skills">;
  name: string;
  category: string;
  icon?: string;
}

export const EMPTY_SKILL_DRAFT: SkillDraft = {
_id: "" as Id<"skills">,
  name: "",
  category: "",
  icon: "",
};

export function toSkillDraft(skill: Doc<"skills"> | undefined): SkillDraft {
  if (!skill) return EMPTY_SKILL_DRAFT;
  return { _id: skill._id, name: skill.name, category: skill.category, icon: skill.icon ?? "" };
}
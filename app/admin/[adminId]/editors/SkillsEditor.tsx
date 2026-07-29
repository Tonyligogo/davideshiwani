// features/skills/components/SkillEditor.tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { EMPTY_SKILL_DRAFT, SkillDraft, toSkillDraft } from "@/app/features/skills/type";
import { useDraftPreview } from "@/contexts/draft-preview-context";
import { TextField } from "../components/fields/TextField";
import { useSelectedSection } from "@/contexts/section-context";

 function draftKey(itemId?: string | null): string {
  return `skills:${itemId ?? "new"}`;
}

export function SkillEditor({ itemId }: { itemId: string | null }) {
  const {setSelectedItemId} = useSelectedSection();
  const isNew = itemId === null || itemId === "new";
  const skills = useQuery(api.skill.list);
  const existing = skills?.find((s) => s._id === itemId);
  const key = draftKey(itemId);

  const createSkill = useMutation(api.skill.create);
  const updateSkill = useMutation(api.skill.update);
  const removeSkill = useMutation(api.skill.remove);

  const { getDraft, setDraft, patchDraft } = useDraftPreview();

  useState(() => setDraft<SkillDraft>(key, toSkillDraft(existing)));
  const seeded = useRef(false);
  
    useEffect(() => {
      if (!seeded.current) {
        setDraft<SkillDraft>(key, toSkillDraft(existing));
        seeded.current = true;
      }
    }, [key]);

  const draft = getDraft<SkillDraft>(key, EMPTY_SKILL_DRAFT);

  if (skills === undefined) return <div className="p-6 text-sm text-neutral-400">Loading…</div>;
  if (!isNew && !existing) return <div className="p-6 text-sm text-neutral-400">Skill not found.</div>;

  async function handleSave() {
    if (isNew) {
      await createSkill({ name: draft.name, category: draft.category, icon: draft.icon || undefined });
    } else if (existing) {
      await updateSkill({ id: existing._id, name: draft.name, category: draft.category, icon: draft.icon || undefined });
    }
    setDraft<SkillDraft>(key, EMPTY_SKILL_DRAFT);
  }

  async function handleDelete() {
    if (existing) await removeSkill({ id: existing._id });
  }

  return (
    <div className="p-6 space-y-4">
      <div className="border-b border-[#212121] pb-2 flex justify-between items-center">
        <h1>{isNew ? "New Skill" : "Edit Skill"}</h1>
        <button
        onClick={() => setSelectedItemId(null)}
        className="text-sm cursor-pointer bg-[#0000ff] px-2 py-1 rounded-md"
      >
        + Add skill
      </button>
      </div>
      
      <TextField label="Name" value={draft.name} onChange={(v) => patchDraft<SkillDraft>(key, { name: v })} placeholder="e.g. Figma" />
      <TextField label="Category" value={draft.category} onChange={(v) => patchDraft<SkillDraft>(key, { category: v })} placeholder="e.g. Design Tools" />
      <TextField label="Icon URL" value={draft.icon ?? ""} onChange={(v) => patchDraft<SkillDraft>(key, { icon: v })} />
      <div className="flex gap-2 border-y border-[#212121] py-4 mt-8 justify-end">
        <button onClick={handleSave} className="bg-[#0000ff] text-white px-4 py-1 rounded-md text-sm">
          {isNew ? "Create" : "Save"}
        </button>
        <button
        onClick={() => setSelectedItemId(null)}
        className="text-sm cursor-pointer bg-[#232323] px-4 py-1 rounded-md"
      >
        Cancel
      </button>
        {!isNew && (
          <button onClick={handleDelete} className="text-red-500 text-sm px-2">Delete</button>
        )}
      </div>
    </div>
  );
}
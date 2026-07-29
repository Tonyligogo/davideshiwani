"use client";

import { useDraftPreview } from "@/contexts/draft-preview-context";
import { AboutDraft, EMPTY_ABOUT_DRAFT } from "./type";
import IntroSection from "@/app/(root)/components/intro-section";

export function AboutPreview() {
  const { getDraft } = useDraftPreview();
  const draft = getDraft<AboutDraft>("about", EMPTY_ABOUT_DRAFT);
  console.log('my changing draft', draft)

  if (!draft) return <div className="p-6 text-sm text-neutral-400">Nothing to preview yet.</div>;

  const data = {
    _id: draft._id,
    avatarStorageId: draft.avatarStorageId,
    title: draft.title,
    description: draft.description,
    avatarUrl: draft.avatarUrl,
    socialLinks: draft.socialLinks,
  }

  return (
    <IntroSection
    about={data}
        selected={true}
    />
  );
}
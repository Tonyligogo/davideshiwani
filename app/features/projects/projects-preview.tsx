"use client";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useSelectedSection } from "@/contexts/section-context";
import { useDraftPreview } from "@/contexts/draft-preview-context";
import { draftKey } from "@/app/admin/[adminId]/editors/ProjectEditor";
import { EMPTY_PROJECT_DRAFT, ProjectDraft } from "./types";
import ProjectsSection from "@/app/(root)/components/landing-page-sections/projects-section";

export function ProjectsPreview() {
  const projects = useQuery(api.projects.listAll) ?? [];
  const { selectedItemId, setSelectedItemId } = useSelectedSection();
  const { getDraft } = useDraftPreview();

  const isNew = selectedItemId === null || selectedItemId === "new";
  const key = draftKey(selectedItemId);
  const draft = getDraft<ProjectDraft>(key, EMPTY_PROJECT_DRAFT);

  const cards = projects.map((p) => {
    if (p._id !== selectedItemId) {
      return {
        _id: p._id,
        title: p.title,
        description: p.description,
        tag: p.tag,
        type: p.type,
        coverImageUrl: p.coverImageUrl,
        previewImageUrls: p.previewImages.map((img) => img.url).filter((u): u is string => !!u),
        logoUrl: p.logoUrl,
        link: p.link,
        published: p.published,
      };
    }
    // swap in the live draft for the currently-selected project
    return {
      _id: p._id,
      title: draft.title,
      description: draft.description,
      tag: draft.tag,
      type: draft.type,
      coverImageUrl: draft.coverImagePreviewUrl,
      previewImageUrls: draft.previewImages.map((img) => img.url).filter((u): u is string => !!u),
      logoUrl: draft.logoPreviewUrl,
      link: draft.link,
      published: draft.published,
    };
  });

  const previewCards = isNew
    ? [
        ...cards,
        {
          _id: "draft-new",
          title: draft.title || "Untitled project",
          description: draft.description,
          tag: draft.tag,
          type: draft.type,
          coverImageUrl: draft.coverImagePreviewUrl,
          previewImageUrls: draft.previewImages.map((img) => img.url).filter((u): u is string => !!u),
          logoUrl: draft.logoPreviewUrl,
          link: draft.link,
          published: draft.published,
        },
      ]
    : cards;

  return (
    <div className="overflow-auto h-screen">
        <div className="overflow-auto">
            <ProjectsSection
            projects={previewCards}
            selectedId={isNew ? "draft-new" : selectedItemId}
            onSelect={(id:string) => setSelectedItemId(id === "draft-new" ? "new" : id)}
            previewMode={true}
            />
        </div>
    </div>
  );
}
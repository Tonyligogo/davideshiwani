// features/projects/types.ts
import { Id } from "@/convex/_generated/dataModel";

export interface PreviewImage {
  storageId: Id<"_storage">;
  url: string | null;
}

export interface ProjectDraft {
  tag: string;
  title: string;
  description: string;
  coverImageStorageId: Id<"_storage"> | null;
  coverImagePreviewUrl: string | null;
  logoStorageId: Id<"_storage"> | null;
  logoPreviewUrl: string | null;
  previewImages: PreviewImage[];
  link: string;
  published: boolean;
  type: string;
}

export const EMPTY_PROJECT_DRAFT: ProjectDraft = {
  tag: "",
  title: "",
  description: "",
  coverImageStorageId: null,
  coverImagePreviewUrl: null,
  logoStorageId: null,
  logoPreviewUrl: null,
  previewImages: [],
  link: "",
  published: false,
  type: "personal",
};

// shape returned by projects.listAll / projects.getById after resolution
export interface ResolvedProject {
  _id: Id<"projects">;
  tag: string;
  title: string;
  description: string;
  coverImageStorageId: Id<"_storage"> | null;
  coverImageUrl: string | null;
  logoStorageId: Id<"_storage"> | null;
  logoUrl: string | null;
  previewImages: PreviewImage[];
  link?: string;
  published: boolean;
  type: string;
}

export function toProjectDraft(project: ResolvedProject | undefined): ProjectDraft {
  if (!project) return EMPTY_PROJECT_DRAFT;
  return {
    tag: project.tag,
    title: project.title,
    description: project.description,
    coverImageStorageId: project.coverImageStorageId,
    coverImagePreviewUrl: project.coverImageUrl,
    logoStorageId: project.logoStorageId,
    logoPreviewUrl: project.logoUrl,
    previewImages: project.previewImages,
    link: project.link ?? "",
    published: project.published,
    type: project.type,
  };
}
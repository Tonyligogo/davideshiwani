"use client";

import { useEffect, useRef } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useDraftPreview } from "@/contexts/draft-preview-context";
import { EMPTY_PROJECT_DRAFT, ProjectDraft, toProjectDraft } from "@/app/features/projects/types";
import { TextField } from "../components/fields/TextField";
import { TextAreaField } from "../components/fields/TextAreaField";
import { SelectField } from "../components/fields/SelectField";
import { ImageUploader } from "../components/image-uploader";
import { MultiImageUploader } from "@/app/features/projects/multi-image-uploader";

const TYPE_OPTIONS = [
  { value: "personal", label: "Personal" },
  { value: "client", label: "Client" },
];

export function draftKey(itemId?: string | null): string {
  return `projects:${itemId ?? "new"}`;
}

export function ProjectEditor({ itemId }: { itemId: string | null }) {
  const isNew = itemId === null || itemId === "new";
  const projects = useQuery(api.projects.listAll);
  const existing = projects?.find((p) => p._id === itemId);

  const createProject = useMutation(api.projects.create);
  const updateProject = useMutation(api.projects.update);
  const removeProject = useMutation(api.projects.remove);
  const togglePublished = useMutation(api.projects.togglePublished);

  const { getDraft, setDraft, patchDraft } = useDraftPreview();
  const key = draftKey(itemId);

  const seeded = useRef(false);

  useEffect(() => {
    if (!seeded.current) {
      setDraft<ProjectDraft>(key, toProjectDraft(existing));
      seeded.current = true;
    }
  }, [key]);

  const draft = getDraft<ProjectDraft>(key, EMPTY_PROJECT_DRAFT);

  if (projects === undefined) return <div className="p-6 text-sm text-neutral-400">Loading…</div>;
  if (!isNew && !existing) return <div className="p-6 text-sm text-neutral-400">Project not found.</div>;

  async function handleSave() {
    const payload = {
      tag: draft.tag,
      title: draft.title,
      description: draft.description,
      coverImageUrl: draft.coverImageStorageId ?? undefined,
      logoUrl: draft.logoStorageId ?? undefined,
      previewUrls: draft.previewImages.map((img) => img.storageId),
      link: draft.link || undefined,
      published: draft.published,
      type: draft.type,
    };

    if (isNew) {
      await createProject(payload);
      setDraft<ProjectDraft>(key, EMPTY_PROJECT_DRAFT); // clear "new" form after creating
    } else if (existing) {
      await updateProject({ id: existing._id, ...payload });
    }
  }

  async function handleDelete() {
    if (existing) await removeProject({ id: existing._id });
    setDraft<ProjectDraft>(key, EMPTY_PROJECT_DRAFT); // clear form after deleting
  }

  async function handleTogglePublished() {
    if (existing) {
      await togglePublished({ id: existing._id, published: !draft.published });
      patchDraft<ProjectDraft>(key, { published: !draft.published });
    } else {
      patchDraft<ProjectDraft>(key, { published: !draft.published });
    }
  }

  return (
    <div className="p-6 space-y-5">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">{isNew ? "New Project" : "Edit Project"}</h2>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={draft.published} onChange={handleTogglePublished} />
          Published
        </label>
      </div>

      <TextField label="Title" value={draft.title} onChange={(v) => patchDraft<ProjectDraft>(key, { title: v })} />
      <TextAreaField label="Description" value={draft.description} onChange={(v) => patchDraft<ProjectDraft>(key, { description: v })} rows={4} />
      <TextField label="Tag" value={draft.tag} onChange={(v) => patchDraft<ProjectDraft>(key, { tag: v })} placeholder="e.g. graphic design" />
      <SelectField label="Type" value={draft.type} options={TYPE_OPTIONS} onChange={(v) => patchDraft<ProjectDraft>(key, { type: v })} />
      <TextField label="Link" value={draft.link} onChange={(v) => patchDraft<ProjectDraft>(key, { link: v })} placeholder="https://..." />

      <ImageUploader
        label="Cover Image"
        value={draft.coverImagePreviewUrl}
        section="projects"
        onChange={(storageId, previewUrl) =>
          patchDraft<ProjectDraft>(key, { coverImageStorageId: storageId, coverImagePreviewUrl: previewUrl })
        }
      />

      <ImageUploader
        label="Logo"
        value={draft.logoPreviewUrl}
        section="projects"
        onChange={(storageId, previewUrl) =>
          patchDraft<ProjectDraft>(key, { logoStorageId: storageId, logoPreviewUrl: previewUrl })
        }
      />

      <MultiImageUploader
        label="Preview Images"
        section="projects"
        values={draft.previewImages}
        onChange={(images) => patchDraft<ProjectDraft>(key, { previewImages: images })}
      />

      <div className="flex gap-2">
        <button onClick={handleSave} className="bg-black text-white px-4 py-2 rounded-md text-sm">
          {isNew ? "Create" : "Save"}
        </button>
        {!isNew && (
          <button onClick={handleDelete} className="text-red-500 text-sm px-2">
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
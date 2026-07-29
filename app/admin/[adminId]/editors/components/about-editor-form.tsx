"use client";

import { useState } from "react";
import { useUpdateAboutSection } from "@/app/features/about/api/use-update-about-content";
import { Id } from "@/convex/_generated/dataModel";
import { SectionTitle } from "./section-title";
import { ImageUploader } from "../../components/image-uploader";
import { TextField } from "../../components/fields/TextField";
import { TextAreaField } from "../../components/fields/TextAreaField";
import { useDraftPreview } from "@/contexts/draft-preview-context";
import { AboutDraft, EMPTY_ABOUT_DRAFT, SocialLink } from "@/app/features/about/type";

export function AboutEditorForm({ about }: { about?: AboutDraft | null }) {
    const { getDraft, setDraft, patchDraft } = useDraftPreview();
  const { mutate: updateAbout } = useUpdateAboutSection();

   const [initialized] = useState(() => {
    setDraft<AboutDraft>(
      "about",
      about
        ? {
            _id: about._id,
            title: about.title,
            description: about.description,
            socialLinks: about.socialLinks,
            avatarStorageId: about.avatarStorageId,
            avatarUrl: about.avatarUrl,
          }
        : EMPTY_ABOUT_DRAFT
    );
    return true;
  });

  const draft = getDraft<AboutDraft>("about", EMPTY_ABOUT_DRAFT);
  if (!initialized || !draft) return null;

function updateLink(i: number, patch: Partial<SocialLink>) {
    const next = [...draft.socialLinks];
    next[i] = { ...next[i], ...patch };
    patchDraft<AboutDraft>("about", { socialLinks: next });
  }

  function addLink() {
    patchDraft<AboutDraft>("about", { socialLinks: [...draft.socialLinks, { platform: "", url: "" }] });
  }

  function removeLink(i: number) {
    patchDraft<AboutDraft>("about", { socialLinks: draft.socialLinks.filter((_, idx) => idx !== i) });
  }

  function handleAvatarChange(storageId: Id<"_storage">, previewUrl: string | null) {
    patchDraft<AboutDraft>("about", { avatarStorageId: storageId, avatarUrl: previewUrl });
  }

  async function handleSave() {
    await updateAbout({
      aboutId: about?._id,
      title: draft.title,
      description: draft.description,
      avatarUrl: draft.avatarStorageId!,
      socialLinks: draft.socialLinks,
    });
  }

  return (
    <div className="p-6 space-y-5">
      <SectionTitle title="About Section" />

      <ImageUploader
        label="Image"
        value={about?.avatarUrl}
        aspectClassName="aspect-square"
        onChange={handleAvatarChange}
        section='about'
      />

      <TextField
        label="Title"
        value={draft.title}
        onChange={(v) => patchDraft<AboutDraft>("about", { title: v })}
      />
      <TextAreaField
        label="Description"
        value={draft.description}
        onChange={(v) => patchDraft<AboutDraft>("about", { description: v })}
        rows={5}
      />

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm">Social Links</span>
          <button
            onClick={addLink}
            className="text-sm cursor-pointer bg-[#232323] px-2 py-1 rounded-md"
          >
            + Add social link
          </button>
        </div>
        {draft.socialLinks.map((link, i) => (
          <div key={i} className="border rounded-md p-3 space-y-2">
            <TextField label="Platform" value={link.platform} onChange={(v) => updateLink(i, { platform: v })} placeholder="Figma" />
            <TextField label="Social Link" value={link.url ?? ""} onChange={(v) => updateLink(i, { url: v })} placeholder="https://..." />
            <TextField label="Icon SVG Path (optional)" value={link.icon ?? ""} onChange={(v) => updateLink(i, { icon: v })} />
            <TextField label="Phone number (optional)" value={link.phone ?? ""} type="number" onChange={(v) => updateLink(i, { phone: v })} />
            <button onClick={() => removeLink(i)} className="text-red-500 text-xs">Remove</button>
          </div>
        ))}
      </div>

      <button
        onClick={handleSave}
        className="bg-black text-white px-4 py-2 rounded-md text-sm"
      >
        Save
      </button>
    </div>
  );
}

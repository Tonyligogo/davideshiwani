"use client";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useState } from "react";
import { PreviewImage } from "./types";

interface MultiImageUploaderProps {
  label?: string;
  section: string;
  values: PreviewImage[];
  onChange: (images: PreviewImage[]) => void;
}

export function MultiImageUploader({ label, section, values, onChange }: MultiImageUploaderProps) {
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const recordImage = useMutation(api.files.recordImage);
  const [uploading, setUploading] = useState(false);

  async function handleFilesSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;

    setUploading(true);
    try {
      const newImages: PreviewImage[] = [];
      for (const file of files) {
        const uploadUrl = await generateUploadUrl();
        const result = await fetch(uploadUrl, {
          method: "POST",
          headers: { "Content-Type": file.type },
          body: file,
        });
        const { storageId } = await result.json();
        await recordImage({ storageId, section });
        newImages.push({ storageId, url: URL.createObjectURL(file) });
      }
      onChange([...values, ...newImages]);
    } finally {
      setUploading(false);
    }
  }

  function handleRemove(storageId: Id<"_storage">) {
    onChange(values.filter((v) => v.storageId !== storageId));
  }

  return (
    <div className="space-y-2">
      {label && <p className="text-sm font-medium">{label}</p>}
      <div className="grid grid-cols-3 gap-2">
        {values.map((img) => (
          <div key={img.storageId} className="relative aspect-video rounded overflow-hidden border group">
            {img.url && <img src={img.url} className="w-full h-full object-cover" alt="" />}
            <button
              type="button"
              onClick={() => handleRemove(img.storageId)}
              className="absolute cursor-pointer top-1 right-1 bg-black/60 text-white text-xs rounded px-1.5 py-0.5 opacity-0 group-hover:opacity-100"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <label className="text-sm text-blue-600 cursor-pointer">
        {uploading ? "Uploading…" : "+ Add images"}
        <input type="file" accept="image/*" multiple className="hidden" onChange={handleFilesSelect} />
      </label>
    </div>
  );
}
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useRef } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

interface ImageUploaderProps {
  value?: string | null;
  section: string; // "about" | "hero" | "skills" | "projects" | "blogs"
  purpose?: string; // e.g. "avatar", "cover", "logo"
  onChange: (storageId: Id<"_storage">, previewUrl: string | null) => void;
  label?: string;
  aspectClassName?: string;
}

export function ImageUploader({
  value,
  section,
  purpose,
  onChange,
  label = "Image",
  aspectClassName = "aspect-video",
}: ImageUploaderProps) {
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const recordImage = useMutation(api.files.recordImage);
  const gallery = useQuery(api.files.listBySection, { section });

  const [uploading, setUploading] = useState(false);
  const [localPreview, setLocalPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setLocalPreview(URL.createObjectURL(file));
    setUploading(true);

    try {
      const uploadUrl = await generateUploadUrl();
      const result = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });
      if (!result.ok) throw new Error("Upload failed");

      const { storageId } = await result.json();
      await recordImage({ storageId, section, purpose }); // tag it for the gallery
      const url = null
      onChange(storageId as Id<"_storage">, url);
    } catch (err) {
      console.error(err);
      alert("Image upload failed, please try again.");
      setLocalPreview(null);
    } finally {
      setUploading(false);
    }
  }

  function handlePickFromGallery(storageId: Id<"_storage">, url: string | null) {
    setLocalPreview(url);
    onChange(storageId, url);
  }

  const displayUrl = localPreview ?? value;

  return (
    <div className="space-y-2">
      {label && <p className="text-sm font-medium">{label}</p>}

      <div
        className={`relative ${aspectClassName} w-full max-w-xs rounded-lg border border-dashed border-[#444] overflow-hidden bg-[#232323] cursor-pointer group`}
        onClick={() => inputRef.current?.click()}
      >
        {displayUrl ? (
          <img src={displayUrl} alt={label} className="w-full h-full object-cover" />
        ) : (
          <div className="flex items-center justify-center h-full text-sm text-neutral-400">
            Click to upload
          </div>
        )}
        {uploading && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-sm">
            Uploading…
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileSelect}
      />

      {gallery && (
        <>
        <p className="text-sm font-medium">Select from previously uploaded images</p>
          <div className="grid grid-cols-4 gap-2 p-2 max-h-24 overflow-y-auto">
            {gallery.map((img,index) => (
              <button
                key={img._id}
                type="button"
                onClick={() => handlePickFromGallery(img.storageId, img.url)}
                className="aspect-square rounded overflow-hidden"
              >
                {img.url && (
                  <img src={img.url} alt={`Image ${index + 1}`} className="w-full h-full object-cover" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
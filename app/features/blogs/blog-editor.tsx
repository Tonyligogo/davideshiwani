"use client";
import { useEffect, useRef, useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { slugify } from "@/lib/slugify";
import { useDraftPreview } from "@/contexts/draft-preview-context";
import { BlogDraft, EMPTY_BLOG_DRAFT, toBlogDraft } from "./types";
import { ImageUploader } from "@/app/admin/[adminId]/components/image-uploader";
import dynamic from "next/dynamic";

function draftKey(itemId?: string | null): string {
  return `blogs:${itemId ?? "new"}`;
}

const BlogContentEditor = dynamic(
  () => import("@/app/features/blogs/blog-content-editor"),
  { ssr: false}
);

export function BlogEditor({ itemId }: { itemId: string | null }) {
  const isNew = itemId === null || itemId === "new";
  const blogs = useQuery(api.blogs.listAll);
  const existing = blogs?.find((b) => b._id === itemId);
  const [editorKey, setEditorKey] = useState(0);

  const createBlog = useMutation(api.blogs.create);
  const updateBlog = useMutation(api.blogs.update);
  const removeBlog = useMutation(api.blogs.remove);

  const { getDraft, setDraft, patchDraft } = useDraftPreview();
  const key = draftKey(itemId);

  const seeded = useRef(false);
  useEffect(() => {
    if (!seeded.current) {
      setDraft<BlogDraft>(key, toBlogDraft(existing));
      seeded.current = true;
    }
  }, []); // one-time seed per mount; remount handled by `key={itemId}` in Editor.tsx

  const draft = getDraft<BlogDraft>(key, EMPTY_BLOG_DRAFT);

  if (blogs === undefined)
    return <div className="p-6 text-sm text-neutral-400">Loading…</div>;
  if (!isNew && !existing)
    return <div className="p-6 text-sm text-neutral-400">Post not found.</div>;

  function handleTitleChange(title: string) {
    const patch: Partial<BlogDraft> = { title };
    // only auto-regenerate the slug while the owner hasn't manually edited it
    if (!draft.slugManuallyEdited) {
      patch.slug = slugify(title);
    }
    patchDraft<BlogDraft>(key, patch);
  }

  function handleSlugChange(slug: string) {
    patchDraft<BlogDraft>(key, {
      slug: slugify(slug),
      slugManuallyEdited: true,
    });
  }

  async function handleSave() {
    const payload = {
      title: draft.title,
      slug: draft.slug,
      excerpt: draft.excerpt,
      content: draft.content,
      coverImage:
        draft.coverImageStorageId ?? existing?.coverImage ?? undefined,
      featured: draft.featured,
      published: draft.published,
    };

    if (isNew) {
      await createBlog(payload);
      setDraft<BlogDraft>(key, EMPTY_BLOG_DRAFT); // clear the "new post" form after creating
    } else if (existing) {
      await updateBlog({ id: existing._id, ...payload });
    }
    setEditorKey((prevKey) => prevKey + 1);
  }

  async function handleDelete() {
    if (existing) await removeBlog({ id: existing._id });
  }

  return (
    <div className="max-w-3xl mx-auto h-screen overflow-auto">
      <div className="flex items-center justify-between px-6 py-3 sticky bg-black top-0 z-10">
        <div className="flex items-center gap-4 text-sm">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={draft.published}
              onChange={(e) =>
                patchDraft<BlogDraft>(key, { published: e.target.checked })
              }
            />
            Publish
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={draft.featured}
              onChange={(e) =>
                patchDraft<BlogDraft>(key, { featured: e.target.checked })
              }
            />
            Featured on homepage
          </label>
        </div>
        <div className="flex gap-2">
          {!isNew && (
            <button
              onClick={handleDelete}
              className="text-red-500 text-sm px-2"
            >
              Delete
            </button>
          )}
          <button
            onClick={handleSave}
            className="bg-[#0000ff] text-white px-4 py-2 rounded-md text-sm"
          >
            {isNew ? "Publish Post" : "Save"}
          </button>
        </div>
      </div>

      {/* everything below is styled to match how it will actually appear on /blog/[slug] */}
      <div className="px-6 py-10 space-y-6">
        <div className="space-y-2">
          <p className="font-semibold text-lg">Post title</p>
          <textarea
            value={draft.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Post title"
            rows={2}
            className="w-full resize-none text-4xl font-semibold bg-[#232323] p-2 rounded-lg outline-none placeholder:text-neutral-300"
          />
        </div>
        <div className="space-y-2">
          <p className="font-semibold text-lg">Cover Image</p>
          <ImageUploader
            label=""
            value={draft.coverImagePreviewUrl}
            section="blogs"
            aspectClassName="aspect-video"
            onChange={(storageId, previewUrl) =>
              patchDraft<BlogDraft>(key, {
                coverImageStorageId: storageId,
                coverImagePreviewUrl: previewUrl,
              })
            }
          />
        </div>

        <div className="space-y-2">
          <p className="font-semibold text-lg">
            Blog url{" "}
            <span className="text-sm font-normal text-neutral-400">
              (Auto-generated from post title, but editable)
            </span>{" "}
          </p>
          <div className="flex items-center gap-2 text-sm bg-[#232323] p-2 rounded-lg text-neutral-200">
            <span>blogs/</span>
            <input
              value={draft.slug}
              onChange={(e) => handleSlugChange(e.target.value)}
              placeholder="auto-generated-from-title"
              className="outline-none w-full focus:border-neutral-300 bg-transparent"
            />
          </div>
        </div>

        <div className="space-y-2">
          <p className="font-semibold text-lg">
            Excerpt{" "}
            <span className="text-sm font-normal text-neutral-400">
              (Shown on blog cards)
            </span>{" "}
          </p>
          <textarea
            value={draft.excerpt}
            onChange={(e) =>
              patchDraft<BlogDraft>(key, { excerpt: e.target.value })
            }
            placeholder="Short excerpt shown on blog cards…"
            rows={2}
            className="w-full bg-[#232323] p-2 rounded-lg text-white outline-none resize-none placeholder:text-base placeholder:text-neutral-300"
          />
        </div>
       
        {existing ? (
           <BlogContentEditor
          key={editorKey}
          defaultValue={draft.content ? JSON?.parse(draft.content) : []}
          onChange={(contentJson) =>
            patchDraft<BlogDraft>(key, { content: contentJson })
          }
        />
        ):(
           <BlogContentEditor
          key={editorKey}
          defaultValue={draft.content ? JSON.parse(draft.content) : []}
          onChange={(contentJson) =>
            patchDraft<BlogDraft>(key, { content: contentJson })
          }
        />
        )}
      </div>
    </div>
  );
}

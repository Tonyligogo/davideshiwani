import { Id } from "@/convex/_generated/dataModel";

export interface BlogDraft {
  title: string;
  slug: string;
  slugManuallyEdited: boolean; // tracks whether owner overrode the auto-slug
  excerpt: string;
  content: string; // Quill Delta JSON string
  coverImageStorageId: Id<"_storage"> | null;
  coverImagePreviewUrl: string | null;
  featured: boolean;
  published: boolean;
}

export const EMPTY_BLOG_DRAFT: BlogDraft = {
  title: "",
  slug: "",
  slugManuallyEdited: false,
  excerpt: "",
  content: "",
  coverImageStorageId: null,
  coverImagePreviewUrl: null,
  featured: false,
  published: false,
};

interface ResolvedBlog {
  _id: Id<"blogs">;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImageUrl: string | null;
  featured?: boolean;
  published: boolean;
}

export function toBlogDraft(blog: ResolvedBlog | undefined): BlogDraft {
  if (!blog) return EMPTY_BLOG_DRAFT;
  return {
    title: blog.title,
    slug: blog.slug,
    slugManuallyEdited: true, // existing posts: don't auto-regenerate their slug from title edits
    excerpt: blog.excerpt,
    content: blog.content,
    coverImageStorageId: null, // only set when a NEW image is picked; existing one shown via preview url
    coverImagePreviewUrl: blog.coverImageUrl,
    featured: blog.featured ?? false,
    published: blog.published,
  };
}
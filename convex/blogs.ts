// convex/blogs.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { requireAuth } from "./lib/auth";
import { getAuthUserId } from "@convex-dev/auth/server";

export const listPublished = query({
  handler: async (ctx) => {
    const blogs = await ctx.db
      .query("blogs")
      .filter((q) => q.eq(q.field("published"), true))
      .collect();

    return await Promise.all(
      blogs.map(async (blog) => ({
        ...blog,
        coverImageUrl: blog.coverImage
          ? await ctx.storage.getUrl(blog.coverImage)
          : null,
      }))
    );
  },
});

// homepage showcase — featured posts, most recent first
export const listFeatured = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, { limit = 3 }) => {
    const posts = await ctx.db
      .query("blogs")
      .filter((q) => q.and(q.eq(q.field("published"), true), q.eq(q.field("featured"), true)))
      .order("desc")
      .take(limit);

    return Promise.all(
      posts.map(async (blog) => ({
        ...blog,
        coverImageUrl: blog.coverImage
          ? await ctx.storage.getUrl(blog.coverImage)
          : null,
      }))
    );
  },
});

export const listAll = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
        if (!userId) {
          throw new Error("Unauthorized");
        }
    const blogs = await ctx.db.query("blogs").collect();
    return await Promise.all(
      blogs.map(async (blog) => ({
        ...blog,
        coverImageUrl: blog.coverImage
          ? await ctx.storage.getUrl(blog.coverImage)
          : null,
      }))
    );
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) => {
    const blog = await ctx.db
      .query("blogs")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();
    if (!blog) return null;
    return {
      ...blog,
      coverImageUrl: blog.coverImage
        ? await ctx.storage.getUrl(blog.coverImage)
        : null,
    };
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    slug: v.string(),
    excerpt: v.string(),
    content: v.string(),
    coverImage: v.optional(v.id("_storage")),
    featured: v.optional(v.boolean()),
    published: v.boolean(),
  },
  handler: async (ctx, args) => {
    await requireAuth(ctx);
    const existingSlug = await ctx.db
      .query("blogs")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
    if (existingSlug) throw new Error("A blog with this slug already exists");
    return await ctx.db.insert("blogs", args);
  },
});

export const update = mutation({
  args: {
    id: v.id("blogs"),
    title: v.string(),
    slug: v.string(),
    excerpt: v.string(),
    content: v.string(),
    coverImage: v.optional(v.id("_storage")),
    featured: v.optional(v.boolean()),
    published: v.boolean(),
  },
  handler: async (ctx, { id, ...rest }) => {
    await requireAuth(ctx);
    await ctx.db.patch(id, rest);
  },
});

export const remove = mutation({
  args: { id: v.id("blogs") },
  handler: async (ctx, { id }) => {
    await requireAuth(ctx);
    await ctx.db.delete(id);
  },
});

// Needed for uploading the cover image from the dashboard
export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    await requireAuth(ctx);
    return await ctx.storage.generateUploadUrl();
  },
});
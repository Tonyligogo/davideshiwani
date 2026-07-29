import { query, mutation, QueryCtx } from "./_generated/server";
import { Doc } from "./_generated/dataModel";
import { v } from "convex/values";
import { requireAuth } from "./lib/auth";
import { getAuthUserId } from "@convex-dev/auth/server";

async function withResolvedUrls(ctx: QueryCtx, project: Doc<"projects">) {
  const [coverImageUrl, logoUrl, previewUrls] = await Promise.all([
    project.coverImageUrl ? ctx.storage.getUrl(project.coverImageUrl) : null,
    project.logoUrl ? ctx.storage.getUrl(project.logoUrl) : null,
    Promise.all(project.previewUrls.map((id) => ctx.storage.getUrl(id))),
  ]);

  return {
    ...project,
    // keep the raw storage ids under explicit names...
    coverImageStorageId: project.coverImageUrl ?? null,
    logoStorageId: project.logoUrl ?? null,
    previewImages: project.previewUrls.map((storageId, i) => ({
      storageId,
      url: previewUrls[i],
    })),
    // ...and resolved URLs under their own names, for direct <img src>
    coverImageUrl,
    logoUrl,
  };
}

export const listAll = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
            if (!userId) {
              throw new Error("Unauthorized");
            }
    const projects = await ctx.db.query("projects").collect();
    return Promise.all(projects.map((p) => withResolvedUrls(ctx, p)));
  },
});

export const getById = query({
  args: { id: v.id("projects") },
  handler: async (ctx, { id }) => {
    const project = await ctx.db.get(id);
    if (!project) return null;
    return withResolvedUrls(ctx, project);
  },
});

export const listPublished = query({
  handler: async (ctx) => {
    const projects = await ctx.db
      .query("projects")
      .filter((q) => q.eq(q.field("published"), true))
      .collect();
    return Promise.all(projects.map((p) => withResolvedUrls(ctx, p)));
  },
});

export const create = mutation({
  args: {
    tag: v.string(),
    title: v.string(),
    description: v.string(),
    coverImageUrl: v.optional(v.id("_storage")),
    logoUrl: v.optional(v.id("_storage")),
    previewUrls: v.array(v.id("_storage")),
    link: v.optional(v.string()),
    published: v.boolean(),
    type: v.string(),
  },
  handler: async (ctx, args) => {
    await requireAuth(ctx);
    return await ctx.db.insert("projects", args);
  },
});

export const update = mutation({
  args: {
    id: v.id("projects"),
    tag: v.string(),
    title: v.string(),
    description: v.string(),
    coverImageUrl: v.optional(v.id("_storage")),
    logoUrl: v.optional(v.id("_storage")),
    previewUrls: v.array(v.id("_storage")),
    link: v.optional(v.string()),
    published: v.boolean(),
    type: v.string(),
  },
  handler: async (ctx, { id, ...rest }) => {
    await requireAuth(ctx);
    await ctx.db.patch(id, rest);
  },
});

export const togglePublished = mutation({
  args: { id: v.id("projects"), published: v.boolean() },
  handler: async (ctx, { id, published }) => {
    await requireAuth(ctx);
    await ctx.db.patch(id, { published });
  },
});

export const remove = mutation({
  args: { id: v.id("projects") },
  handler: async (ctx, { id }) => {
    await requireAuth(ctx);
    await ctx.db.delete(id);
  },
});
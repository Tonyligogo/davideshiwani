import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { requireAuth } from "./lib/auth";
import { getAuthUserId } from "@convex-dev/auth/server";

export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    await requireAuth(ctx);
    return await ctx.storage.generateUploadUrl();
  },
});

export const recordImage = mutation({
  args: {
    storageId: v.id("_storage"),
    section: v.string(),
    purpose: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await requireAuth(ctx);
    return await ctx.db.insert("images", { ...args, uploadedAt: Date.now() });
  },
});

export const listBySection = query({
  args: { section: v.string() },
  handler: async (ctx, { section }) => {
    const userId = await getAuthUserId(ctx);
            if (!userId) {
                throw new Error("Unauthorized");
            }
    const images = await ctx.db
      .query("images")
      .withIndex("by_section", (q) => q.eq("section", section))
      .order("desc")
      .collect();

    return Promise.all(
      images.map(async (img) => ({
        ...img,
        url: await ctx.storage.getUrl(img.storageId),
      }))
    );
  },
});

export const deleteImage = mutation({
  args: { id: v.id("images") },
  handler: async (ctx, { id }) => {
    await requireAuth(ctx);
    const img = await ctx.db.get(id);
    if (!img) return;
    await ctx.storage.delete(img.storageId); // frees actual storage
    await ctx.db.delete(id); // removes the gallery entry
  },
});
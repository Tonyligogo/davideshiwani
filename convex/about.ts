import { mutation, query, QueryCtx } from "./_generated/server";
import { Doc } from "./_generated/dataModel";
import { v } from "convex/values";
import { requireAuth } from "./lib/auth";

const socialLinkValidator = v.object({
  platform: v.string(),
  url:  v.optional(v.string()),
  phone: v.optional(v.string()),
  icon: v.optional(v.string()),
});

async function resolveAboutUrls(ctx: QueryCtx, about: Doc<"about">) {
  return {
    ...about,
    avatarStorageId:about.avatarUrl,
    avatarUrl: about.avatarUrl
      ? await ctx.storage.getUrl(about.avatarUrl)
      : null,
  };
}

export const get = query({
  handler: async (ctx) => {
    const about = await ctx.db.query("about").first();
    if (!about) return null;
    return resolveAboutUrls(ctx, about);
  },
});

export const update = mutation({
  args: {
    aboutId: v.optional(v.id("about")),
    avatarUrl: v.id("_storage"),
    title: v.string(),
    description: v.string(),
    socialLinks: v.array(socialLinkValidator),
  },
  handler: async (ctx, { aboutId, ...rest }) => {
    await requireAuth(ctx);
    if (aboutId) {
      await ctx.db.patch(aboutId, rest);
    } else {
      await ctx.db.insert("about", rest);
    }
  },
});

export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    await requireAuth(ctx);
    return await ctx.storage.generateUploadUrl();
  },
});
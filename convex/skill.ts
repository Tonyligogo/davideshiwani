// convex/skills.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { requireAuth } from "./lib/auth";

export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query("skills").collect();
  },
});

export const listByCategory = query({
  args: { category: v.string() },
  handler: async (ctx, { category }) => {
    return await ctx.db
      .query("skills")
      .filter((q) => q.eq(q.field("category"), category))
      .collect();
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    icon: v.optional(v.string()),
    category: v.string(),
  },
  handler: async (ctx, args) => {
    await requireAuth(ctx);
    return await ctx.db.insert("skills", args);
  },
});

export const update = mutation({
  args: {
    id: v.id("skills"),
    name: v.string(),
    icon: v.optional(v.string()),
    category: v.string(),
  },
  handler: async (ctx, { id, ...rest }) => {
    await requireAuth(ctx);
    await ctx.db.patch(id, rest);
  },
});

export const remove = mutation({
  args: { id: v.id("skills") },
  handler: async (ctx, { id }) => {
    await requireAuth(ctx);
    await ctx.db.delete(id);
  },
});
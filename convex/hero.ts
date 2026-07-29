import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { requireAuth } from "./lib/auth";


export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("hero").first();
  },
});

export const update = mutation({
  args: {
    roleId: v.optional(v.id("hero")),
    roles: v.array(v.string()),
  },
  handler: async (ctx, { roleId, roles }) => {
    await requireAuth(ctx);
    if (roleId) {
      await ctx.db.patch(roleId, { roles });
    } else {
      // no row yet — create it (first-time setup)
      await ctx.db.insert("hero", { roles });
    }
  },
});
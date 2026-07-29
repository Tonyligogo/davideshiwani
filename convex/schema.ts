import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

const schema = defineSchema({
  ...authTables,
  hero: defineTable({
    roles: v.array(v.string()),
  }),

  about: defineTable({
    avatarUrl: v.id("_storage"),
    title: v.string(),
    description: v.string(),
    socialLinks: v.array(
      v.object({
        platform: v.string(), // "github" | "linkedin" | "twitter" | "dribbble" | "behance" | "instagram" | "custom"
        url: v.optional(v.string()),
        phone: v.optional(v.string()),
        icon: v.optional(v.string()),
      }),
    ),
  }),

  skills: defineTable({
    name: v.string(),
    icon: v.optional(v.string()),
    category: v.string(),
  }),

  projects: defineTable({
    tag: v.string(), // 'graphic design' | 'editing' | 'specific project type/ client name'
    title: v.string(),
    description: v.string(),
    coverImageUrl: v.optional(v.id("_storage")),
    logoUrl: v.optional(v.id("_storage")),
    previewUrls: v.array(v.id("_storage")),
    link: v.optional(v.string()),
    published: v.boolean(),
    type: v.string(), // 'personal' | 'client'
  }),

  blogs: defineTable({
    title: v.string(),
    slug: v.string(),
    excerpt: v.string(),
    content: v.string(),
    coverImage: v.optional(v.id("_storage")),
    published: v.boolean(),
    featured: v.optional(v.boolean()),
  }).index("by_slug", ["slug"]),

  images: defineTable({
    storageId: v.id("_storage"),
    section: v.string(),
    uploadedAt: v.number(),
  }).index("by_section", ["section"]),
});

export default schema;

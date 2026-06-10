import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";
 
const schema = defineSchema({
  ...authTables,
  blogs: defineTable({
    body:v.string(),
    title:v.string(),
    imageUrl:v.optional(v.id("_storage")),
   }).index("title", ["title"]),
});
 
export default schema;
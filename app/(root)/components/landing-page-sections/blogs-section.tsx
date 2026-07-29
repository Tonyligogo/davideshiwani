"use client";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Blogs } from "../blogs";

export default function BlogsSection() {
  const featuredPosts = useQuery(api.blogs.listFeatured, { limit: 3 });

  return <Blogs posts={featuredPosts} />
}
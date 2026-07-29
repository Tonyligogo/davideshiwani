/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import BlogCard from "@/app/features/blogs/blog-card";
const BlogRenderer = dynamic(
  () => import("@/app/features/blogs/blog-renderer"),
  { ssr: false }
);
export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = useQuery(api.blogs.getBySlug, { slug });
  const allPosts = useQuery(api.blogs.listPublished);

  if (post === undefined) {
    return (
      <main className="min-h-screen bg-black text-neutral-100 flex items-center justify-center">
        <p className="text-sm text-neutral-500">Loading…</p>
      </main>
    );
  }

  if (post === null) {
    notFound();
  }

  const morePosts = (allPosts ?? []).filter((p) => p._id !== post._id).slice(0, 4);

  return (
    <main className="min-h-screen bg-black relative grid-bg text-neutral-100">
      {/* Top nav — home + all posts */}
      <div className="sticky top-0 z-100 px-6 md:px-16 pt-6 flex items-center justify-between bg-black/80 backdrop-blur-sm pb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Home
        </Link>
        <Link
          href="/blogs"
          className="text-sm text-neutral-400 hover:text-white transition-colors"
        >
          All posts
        </Link>
      </div>

      {/* Post content — centered, max-w-5xl */}
      <article className="max-w-5xl mx-auto px-6 md:px-16 pt-12 pb-24">
        <span className="font-antagon text-4xl text-[#0000ff]">Writing</span>

        <h1 className="mt-3 text-4xl md:text-6xl font-bold">
          {post.title}
        </h1>

        <p className="mt-6 text-sm text-neutral-500">
          {new Date(post._creationTime).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        {post.coverImageUrl && (
          <div className="mt-10 aspect-2/1 rounded-lg overflow-hidden bg-neutral-900 relative z-50">
            <img
              src={post.coverImageUrl}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="mt-12 prose prose-invert prose-lg max-w-none">
          <BlogRenderer value={post.content} />
        </div>
      </article>

      {/* More posts to read */}
      {morePosts.length > 0 && (
        <section className="max-w-5xl mx-auto px-6 md:px-16 pb-24 border-t border-neutral-800 pt-16">
          <h3 className="text-sm text-neutral-500 mb-8 uppercase tracking-wide">
            More to read
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12">
            {morePosts.map((p) => (
              <BlogCard key={p._id} post={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
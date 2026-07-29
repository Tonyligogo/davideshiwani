"use client";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ArrowLeft } from "lucide-react";
import BlogCard from "../features/blogs/blog-card";

export default function BlogListingPage() {
  const posts = useQuery(api.blogs.listPublished);

  return (
    <div className="min-h-screen bg-black relative grid-bg text-neutral-100">
      {/* Sticky back-to-home arrow */}
      <div className="sticky top-0 z-100 px-6 md:px-16 pt-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Home
        </Link>
      </div>
      <main className="max-w-5xl mx-auto">
        <section className="text-white border-b border-[#232323] mt-8 mb-16 flex items-center justify-center font-sans">
      <div className="text-center">
          <p className="font-antagon mb-12 text-4xl md:text-5xl lg:text-7xl text-[#0000ff]">My Writings</p>

        <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-10 leading-[1.1]">
          Insights,<br />
          Ideas & Innovation
        </h1>

        <p className="text-xl md:text-2xl mb-12 leading-relaxed">
          Explore expert articles, tech trends, and practical tips to keep your<br />
          business ahead of the curve.
        </p>
      </div>
    </section>

        {/* Blog grid — 2 columns */}
        <section className="px-6 md:px-16 pb-24">
          <p className="text-4xl font-bold mb-8">All Posts</p>
            {posts === undefined ? (
            <p className="text-sm text-neutral-500">Loading posts…</p>
            ) : posts.length === 0 ? (
            <p className="text-sm text-neutral-500">No posts published yet.</p>
            ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16">
                {posts.map((post) => (
                <BlogCard key={post._id} post={post} />
                ))}
            </div>
            )}
        </section>
      </main>

    </div>
  );
}
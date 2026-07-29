import BlogCard from "@/app/features/blogs/blog-card";
import { Id } from "@/convex/_generated/dataModel";
import Link from "next/link";

interface BlogCardData {
  coverImageUrl: string | null;
    _id: Id<"blogs">;
    _creationTime: number;
    coverImage?: Id<"_storage"> | undefined;
    featured?: boolean | undefined;
    title: string;
    published: boolean;
    slug: string;
    excerpt: string;
    content: string;
}

interface BlogsShowcaseProps {
  posts: BlogCardData[] | undefined;
}

export function Blogs({ posts }: BlogsShowcaseProps) {
  const safePosts = posts ?? [];

  if (safePosts.length === 0) return null; // nothing featured yet — section just doesn't render

  return (
    <section id="blogs" className="py-20 px-6 md:px-16">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-3xl font-light tracking-wide">From the Blog</h2>
        <Link href="/blogs" className="text-sm text-white cursor-pointer">
          View all posts →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {safePosts.map((post) => (
         <BlogCard key={post._id} post={post} />
        ))}
      </div>
    </section>
  );
}
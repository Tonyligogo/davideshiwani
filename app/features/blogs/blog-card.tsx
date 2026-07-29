/* eslint-disable @next/next/no-img-element */
import { Id } from "@/convex/_generated/dataModel";
import Link from "next/link";

interface BlogCardProps {
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

const BlogCard = ({ post }: { post: BlogCardProps }) => {
  return (
    <Link key={post._id} href={`/blogs/${post.slug}`} className="group block relative z-50">
      <div className="aspect-video bg-neutral-900 overflow-hidden">
        {post.coverImageUrl && (
          <img
            src={post.coverImageUrl}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
      </div>
      <h2 className="text-2xl font-bold text-white my-3">
        {post.title}
      </h2>
      <p className="text-sm text-neutral-300 leading-relaxed line-clamp-2">
        {post.excerpt}
      </p>
      <p className="mt-3 text-sm text-neutral-500">
        {new Date(post._creationTime).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
    </Link>
  );
};

export default BlogCard;

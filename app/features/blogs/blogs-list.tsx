"use client";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useSelectedSection } from "@/contexts/section-context";
import { Button } from "@/components/ui/button";

export function BlogsList() {
  const blogs = useQuery(api.blogs.listAll) ?? [];
  const { selectedItemId, setSelectedItemId } = useSelectedSection();

  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center border-b border-[#232323] pb-2">
        <h2 className="text-lg font-semibold">Blogs</h2>
         <Button onClick={() => setSelectedItemId("new")} className=" bg-[#0000ff] text-white ">
        + New post
      </Button>
      </div>
     
      {blogs.map((b, index) => (
        <button
          key={b._id}
          onClick={() => setSelectedItemId(b._id)}
          className={`block w-full text-left px-2 py-2 rounded-md cursor-pointer text-sm ${
            selectedItemId === b._id ? "bg-[#232323]" : "hover:bg-[#232323]"
          }`}
        >
         {index + 1}. {b.title || "Untitled"} {!b.published && <span className="text-neutral-400">(draft)</span>}
        </button>
      ))}
    </div>
  );
}
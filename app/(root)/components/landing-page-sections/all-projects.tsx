'use client';

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import ProjectsSection from "./projects-section";

const AllProjects = () => {
    const projects = useQuery(api.projects.listAll) ?? [];
     const cards = projects.map((p) => {
    return {
        _id: p._id,
        title: p.title,
        description: p.description,
        tag: p.tag,
        type: p.type,
        coverImageUrl: p.coverImageUrl,
        previewImageUrls: p.previewImages.map((img) => img.url).filter((u): u is string => !!u),
        logoUrl: p.logoUrl,
        link: p.link,
        published: p.published,
      };
  });
  return (
    <ProjectsSection projects={cards} />
  )
}

export default AllProjects
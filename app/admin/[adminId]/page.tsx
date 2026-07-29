"use client";

import HeroSection from "@/app/(root)/components/landing-page-sections/hero-section";
import { AboutPreview } from "@/app/features/about/about-preview";
import { SkillsPreview } from "@/app/features/skills/skills-preview";
import { useSelectedSection } from "@/contexts/section-context";
import { ProjectsPreview } from "@/app/features/projects/projects-preview";
import { BlogEditor } from "@/app/features/blogs/blog-editor";


export default function SectionPreview() {
  const { selectedSection, selectedItemId } = useSelectedSection();

  switch (selectedSection) {
    case "hero":
      return <HeroSection selected={true}/>;

    case "about":
      return <AboutPreview />;

    case "skills":
      return <SkillsPreview />;

    case "projects":
      return <ProjectsPreview/>;

    case "blogs":
      return <BlogEditor key={selectedItemId ?? "new"} itemId={selectedItemId} />; // for blogs, we show the editor/preview in the main area when a blog is selected

    default:
      return (
        <div className="p-6 text-sm text-neutral-400">
          Select a section to preview.
        </div>
      );
  }
}
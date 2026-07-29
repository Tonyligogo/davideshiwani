"use client";

import { useSelectedSection } from "@/contexts/section-context";
import { HeroEditor } from "../editors/HeroEditor";
import { AboutEditor } from "../editors/AboutEditor";
import { SkillEditor } from "../editors/SkillsEditor";
import { ProjectEditor } from "../editors/ProjectEditor";
import { BlogsList } from "@/app/features/blogs/blogs-list";


export function SectionEditor() {
  const { selectedSection, selectedItemId } = useSelectedSection();

  switch (selectedSection) {
    case "hero":
      return <HeroEditor />;

    case "about":
      return <AboutEditor />;

    case "skills":
      return <SkillEditor key={selectedItemId ?? "new"} itemId={selectedItemId} />;

    case "projects":
      return <ProjectEditor key={selectedItemId ?? "new"} itemId={selectedItemId} />

    case "blogs":
      return <BlogsList />; // for blogs, we show a list of posts in the sidebar, and clicking one opens the editor/preview in the main area

    default:
      return (
        <div className="p-6 text-sm text-neutral-400">
          Select a section to edit.
        </div>
      );
  }
}
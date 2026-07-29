"use client";
import { useGetAboutContent } from "@/app/features/about/api/use-get-about-content";
import { AboutEditorForm } from "./components/about-editor-form";

export function AboutEditor() {
  const { data: about } = useGetAboutContent();
  // key forces a fresh mount whenever the loaded doc's identity changes
  return <AboutEditorForm key={about?._id ?? 'new'} about={about} />;
}
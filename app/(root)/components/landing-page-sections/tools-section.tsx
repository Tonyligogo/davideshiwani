'use client';

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import SkillsSection from "../skills-section";

// shows the tools the designer uses to create their work, e.g. Figma, Photoshop, Illustrator, etc.
const ToolsSection = () => {
    const skills = useQuery(api.skill.list) ?? [];
  return (
    <SkillsSection skills={skills} />
  )
}

export default ToolsSection
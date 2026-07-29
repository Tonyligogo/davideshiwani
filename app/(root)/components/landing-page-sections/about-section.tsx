"use client";

import { useGetAboutContent } from "@/app/features/about/api/use-get-about-content";
import IntroSection from "../intro-section";

export default function AboutSection({selected}: {selected?: boolean}) {

    const { data } = useGetAboutContent();

    if (!data) return null;

    return <IntroSection about={data} selected={selected ?? false}/>;
}
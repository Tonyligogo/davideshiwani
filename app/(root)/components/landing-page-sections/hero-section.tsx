"use client";

import { useGetHeroRoles } from "@/app/features/hero/api/use-get-roles";
import Hero from "../hero";

export default function HeroSection({selected}: {selected?: boolean}) {

    const { data } = useGetHeroRoles();

    if (!data) return null;

    return <Hero heroRoles={data} selected={selected ?? false}/>;
}
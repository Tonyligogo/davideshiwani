"use client";

import { useGetHeroRoles } from "@/app/features/hero/api/use-get-roles";
import Hero from "../hero";

export default function HeroSection({selected}: {selected?: boolean}) {

    const { data } = useGetHeroRoles();

    const noData = {
            roles: [] as string[]
    }

    return <Hero heroRoles={data || noData} selected={selected ?? false}/>;
}
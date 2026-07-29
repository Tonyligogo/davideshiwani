import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"

export const useGetHeroRoles = () => {
    const data = useQuery(api.hero.get);
    const isLoading = data === undefined;
    return {data, isLoading};
}
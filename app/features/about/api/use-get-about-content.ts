import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"

export const useGetAboutContent = () => {
    const data = useQuery(api.about.get);
    const isLoading = data === undefined;
    return {data, isLoading};
}
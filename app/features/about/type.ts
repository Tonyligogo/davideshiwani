import { Id } from "@/convex/_generated/dataModel";

export interface SocialLink {
  platform: string;
  url?: string;
  phone?: string;
  icon?: string;
}

export interface AboutDraft {
    _id: Id<"about">;
  title: string;
  description: string;
  socialLinks: SocialLink[];
  avatarStorageId: Id<"_storage"> | null;
  avatarUrl: string | null;
}

export const EMPTY_ABOUT_DRAFT: AboutDraft = {
    _id: "" as Id<"about">,
  title: "",
  description: "",
  socialLinks: [],
  avatarStorageId: null,
  avatarUrl: null,
};
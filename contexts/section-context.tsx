"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  ReactNode,
} from "react";

export type DashboardSection =
  | "hero"
  | "about"
  | "skills"
  | "projects"
  | "blogs";

type SelectedSectionContextType = {
  selectedSection: DashboardSection;
  setSelectedSection: (section: DashboardSection) => void;

  // only meaningful for list sections (skills/projects/blogs)
  // null = nothing selected, "new" = creating a new item, otherwise a Convex _id string
  selectedItemId: string | null;
  setSelectedItemId: (id: string | null) => void;
};

const SelectedSectionContext = createContext<
  SelectedSectionContextType | undefined
>(undefined);

export function SelectedSectionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [selectedSection, setSelectedSection] = useState<DashboardSection>("hero");
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const value = useMemo(
    () => ({
      selectedSection,
      setSelectedSection,
      selectedItemId,
      setSelectedItemId,
    }),
    [selectedSection, selectedItemId]
  );

  return (
    <SelectedSectionContext.Provider value={value}>
      {children}
    </SelectedSectionContext.Provider>
  );
}

export function useSelectedSection() {
  const context = useContext(SelectedSectionContext);

  if (!context) {
    throw new Error(
      "useSelectedSection must be used inside SelectedSectionProvider"
    );
  }

  return context;
}
"use client";
import { createContext, useContext, useState, useCallback, ReactNode } from "react";

type DraftMap = Record<string, unknown>;

interface DraftPreviewContextValue {
  getDraft: <T,>(section: string, defaultValue: T) => T;
  setDraft: <T,>(section: string, value: T) => void;
  patchDraft: <T,>(section: string, patch: Partial<T>) => void;
}

const DraftPreviewContext = createContext<DraftPreviewContextValue | null>(null);

export function DraftPreviewProvider({ children }: { children: ReactNode }) {
  const [drafts, setDrafts] = useState<DraftMap>({});

  const getDraft = useCallback(
    <T,>(section: string, defaultValue: T): T =>
      (drafts[section] as T | undefined) ?? defaultValue,
    [drafts]
  );

  const setDraft = useCallback(<T,>(section: string, value: T) => {
    setDrafts((prev) => ({ ...prev, [section]: value }));
  }, []);

  const patchDraft = useCallback(<T,>(section: string, patch: Partial<T>) => {
    setDrafts((prev) => ({
      ...prev,
      [section]: { ...(prev[section] as T), ...patch },
    }));
  }, []);

  return (
    <DraftPreviewContext.Provider value={{ getDraft, setDraft, patchDraft }}>
      {children}
    </DraftPreviewContext.Provider>
  );
}

export function useDraftPreview() {
  const ctx = useContext(DraftPreviewContext);
  if (!ctx) throw new Error("useDraftPreview must be used within DraftPreviewProvider");
  return ctx;
}
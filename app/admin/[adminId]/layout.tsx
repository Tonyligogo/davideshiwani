"use client";
import { SelectedSectionProvider } from "@/contexts/section-context";
import NavSidebar from "./components/nav-sidebar";
import { SectionEditor } from "./components/editor-sidebar";
import { DraftPreviewProvider } from "@/contexts/draft-preview-context";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SelectedSectionProvider>
        <DraftPreviewProvider>
            <div className="bg-[#111111] h-screen w-screen flex flex-col text-white overflow-hidden">
                <div className="flex-1 flex">
                <aside className="p-2 flex-1">
                    <NavSidebar />
                </aside>
                <main className="border-x border-[#212121] bg-[#171717] flex-5 overflow-auto">
                    {children}
                </main>
                <aside className="p-2 flex-2 h-screen overflow-auto">
                    <SectionEditor />
                </aside>
                </div>
            </div>
        </DraftPreviewProvider>
    </SelectedSectionProvider>
  );
};

export default AdminLayout;

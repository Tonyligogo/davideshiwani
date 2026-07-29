import { UserButton } from "@/app/(auth)/components/user-button";
import { DashboardSection, useSelectedSection } from "@/contexts/section-context";
import { File, GalleryVerticalEnd } from "lucide-react";

const sections: { id: DashboardSection; label: string }[] = [
  { id: "hero", label: "Hero" },
  { id: "about", label: "About"},
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "blogs", label: "Blogs" },
];

const NavSidebar = () => {
    const { selectedSection, setSelectedSection } = useSelectedSection();
  return (
    <div>
      <div className="flex items-center gap-2 mb-5 border-b border-[#212121] pt-2 pb-4">
            <GalleryVerticalEnd size='24'/>
            <span>Dashboard</span>
        </div>
        <span className="text-[#656565] text-lg">Sections</span>
        <nav className="flex-1 space-y-2 mt-2">
          {sections.map((s) => {
            const active = selectedSection === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setSelectedSection(s.id)}
                className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm cursor-pointer transition ${
                  active
                    ? "bg-[#232323] text-primary-foreground"
                    : "text-[#656565] hover:bg-primary"
                }`}
              >
                <File className="h-4 w-4" />
                {s.label}
              </button>
            );
          })}
        </nav>
        <div className="mt-10 border-y border-[#212121] py-2">
          <UserButton/>
        </div>
    </div>
  )
}

export default NavSidebar
"use client";
import { useEffect, useRef, useState } from "react";
import { TextField } from "../components/fields/TextField";
import { SectionTitle } from "./components/section-title";
import { Trash2 } from "lucide-react";
import { useUpdateRoles } from "@/app/features/hero/api/use-update-roles";
import CustomButton from "./components/custom-button";
import { useGetHeroRoles } from "@/app/features/hero/api/use-get-roles";

export function HeroEditor() {
  const { data: hero } = useGetHeroRoles();
  const {mutate: updateRoles, isPending} = useUpdateRoles();
const [roles, setRoles] = useState<string[]>([]);
  const initialized = useRef(false);

  useEffect(() => {
    if (hero && !initialized.current) {
      setRoles(hero.roles);
      initialized.current = true;
    }
  }, [hero]);

  if (hero === undefined) return <EditorSkeleton />;

  function updateRole(i: number, value: string) {
    const next = [...roles];
    next[i] = value;
    setRoles(next);
  }

  function addRole() {
    setRoles([...roles, ""]);
  }

  function removeRole(i: number) {
    setRoles(roles.filter((_, idx) => idx !== i));
  }

  async function handleSave() {
    await updateRoles(
        { roleId: hero?._id, roles },
        {
            onSuccess: (data) => {
                console.log("Roles updated successfully:", data);
            },
            onError: (error) => {
                console.error("Error updating roles:", error);
            },
            onSettled: () => {
                console.log("Update roles operation completed.");
            },
        }
    );
  }

  return (
    <div className="space-y-4">
      <SectionTitle title="Hero Section" />

      <div className="space-y-2">
        <div className="flex justify-between items-center">
        <span className="text-sm font-medium">My Roles</span>
            <button onClick={addRole} className="text-sm cursor-pointer bg-[#232323] px-2 py-1 rounded-md">
          + Add role
        </button>
        </div>
        {roles.map((role, index) => (
          <div key={index} className="flex items-end gap-2">
             <TextField
                label={`Role ${index + 1}`}
                value={role}
                placeholder="e.g. UI/UX Designer"
                onChange={(value) => updateRole(index, value)}
              />
            <button
              onClick={() => removeRole(index)}
              className="text-rose-500 px-2 cursor-pointer bg-transparent py-2.25 rounded-md hover:bg-rose-500/10 transition"
            >
              <Trash2 size='18'/>
            </button>
          </div>
        ))}
        
      </div>

      <CustomButton onClick={handleSave} isPending={isPending} label="Publish" />
    </div>
  );
}

function EditorSkeleton() {
  return <div className="p-6 text-sm text-neutral-400">Loading…</div>;
}
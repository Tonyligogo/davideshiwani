'use client';

import {
  Loader,
  LogOutIcon,
  UserIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuthActions } from "@convex-dev/auth/react";
import { useCurrentUser } from "../api/use-current-user";

export function UserButton() {
  const {data, isLoading} = useCurrentUser();
  const {signOut} = useAuthActions();
  if(isLoading){
    return <Loader className="animate-spin"/>
  }
  if(data === null){
    return null;
  }
  return (
    <div>
      <span>
        <UserIcon />
          {data?.email}
      </span>
      <Button onClick={()=>signOut()}> <LogOutIcon />
        Sign Out</Button>
    </div>
)
}

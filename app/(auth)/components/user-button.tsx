'use client';

import {
  Loader,
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
      <Button onClick={()=>signOut()}>
        Sign Out</Button>
    </div>
)
}

'use client';

import { useState } from "react";
import { SignInCard } from "./sign-in-card";
import { SignUpCard } from "./sign-up-card";

export type SignInFlow = "signIn" | "signUp";

const AuthScreen = () => {
    const [state, setState] = useState<SignInFlow>("signIn"); 
  return (
    <div>
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          Hiking Designer
        </a>
        {state === "signIn" ? <SignInCard onSignUp={() => setState("signUp")} /> : <SignUpCard onSignIn={() => setState("signIn")} />}
      </div>
    </div>
    </div>
  )
}

export default AuthScreen
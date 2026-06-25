'use client';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function SignInCard({ onSignUp }: { onSignUp: () => void }) {
  const { signIn } = useAuthActions();
 const [email, setEmail] = useState('')
 const [password, setPassword] = useState('')
 const [error, setError] = useState('');
 const router = useRouter();
 const [pending, setPending] = useState(false);
 const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
  e.preventDefault();
  setPending(true);
  signIn("password", { email, password, flow: "signIn" })
  .then(()=> {
    router.replace("/admin");
  })
    .catch(() => {
      setError('Invalid email or password');
    })
    .finally(() => setPending(false));
 }
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Hiking Designer-The Man, The Myth, The Legend.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              {!!error && <FieldDescription className="text-destructive">{error}</FieldDescription>}
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  placeholder="m@example.com"
                  onChange={(e)=>setEmail(e.target.value)}
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" value={password} required onChange={(e)=>setPassword(e.target.value)} />
              </Field>
              <Field>
                <Button type="submit" disabled={pending}>Login</Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <button type="button" disabled={pending} onClick={onSignUp}>Sign up</button>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

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
import { useAuthActions } from "@convex-dev/auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function SignUpCard({ onSignIn }: { onSignIn: () => void }) {
  const { signIn } = useAuthActions();
  const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const [error, setError] = useState('');
   const router = useRouter();
 const [pending, setPending] = useState(false);
 const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
  e.preventDefault();
  if(password !== confirmPassword) {
    setError('Passwords do not match');
    return;
  }
  setPending(true);
  signIn("password", { email, password, flow: "signUp" })
    .then(()=> {
      router.replace("/admin");
    })
    .catch(() => {
      setError('Failed to create an account with those credentials');
    })
    .finally(() => setPending(false));
 }
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!!error && <FieldDescription className="text-destructive">{error}</FieldDescription>}
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  value={email}                  
                  onChange={(e)=>setEmail(e.target.value)}
                  required
                />
              </Field>
              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input id="password" type="password"  value={password} required onChange={(e)=>setPassword(e.target.value)} />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm-password">
                      Confirm Password
                    </FieldLabel>
                    <Input id="confirm-password" type="password"  value={confirmPassword} required onChange={(e)=>setConfirmPassword(e.target.value)} />
                  </Field>
                </Field>
                <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription>
              </Field>
              <Field>
                <Button type="submit" disabled={pending}>Create Account</Button>
              </Field>
                <Field>
                <FieldDescription className="text-center">
                  Already have an account? <button type="button" onClick={onSignIn} disabled={pending}>Sign in</button>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}

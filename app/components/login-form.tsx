"use client";
import { cn } from "@app/lib/utils";
import { Button } from "@app/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@app/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@app/components/ui/field";
import { Input } from "@app/components/ui/input";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

// Capitalized 'Props' to follow TypeScript naming conventions
type LoginFormProps = {
  onSubmit: (email: string, password: string) => void;
};

export function LoginForm({ onSubmit }: LoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("gopi@rvsarees.com");
  const [password, setPassword] = useState("Gopi@123");
  const api = process.env.NEXT_PUBLIC_API_URL;
  // This prevents the page reload and allows "Enter to submit" to work
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Hooked up handleSubmit here */}
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Field>
              <Field>
                {/* Removed onClick here; type="submit" will now trigger onSubmit on the form */}
                <Button type="submit">Login</Button>
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => router.push(`${api}/auth/google/callback`)}
                >
                  Login with Google
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="#">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import { useActionState } from "react";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { signUp } from "../actions/signUp";
import { AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export function SignUpForm() {
  const [state, formAction, isPending] = useActionState(signUp, null);
  const router = useRouter();

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Create a new account</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="login">Login</Label>
              <Input
                id="login"
                name="login"
                type="login"
                placeholder="Enter your login"
                required
              />
              {state?.errors?.login && (
                <p className="text-sm text-red-500 mt-1">
                  {state.errors.login}
                </p>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                required
              />
              {state?.errors?.password && (
                <div>
                  <p className="text-sm text-red-500 mt-1">Password must:</p>
                  <ul>
                    {state.errors.password.map((error) => (
                      <li key={error} className="text-sm text-red-500">
                        - {error}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          {Boolean(state?.error) && (
            <div className="flex items-center gap-2 mt-4 text-red-500">
              <AlertCircle size={16} />
              <span className="text-sm">{state?.error?.message}</span>
            </div>
          )}
          <Button className="w-full mt-6" disabled={isPending}>
            Sign Up
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button variant="link" onClick={() => router.push("/sign-in")}>
          Already have an account? Login
        </Button>
      </CardFooter>
    </Card>
  );
}

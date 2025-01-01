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
import { useRouter } from "next/navigation";
import { signIn } from "../actions/signIn";
import { AlertCircle } from "lucide-react";

export function SignInForm() {
  const [state, formAction, isPending] = useActionState(signIn, null);
  const router = useRouter();

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Enter your credentials to login</CardDescription>
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
                <p className="text-sm text-red-500 mt-1">
                  {state.errors.password}
                </p>
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
            Login
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button variant="link" onClick={() => router.push("/sign-up")}>
          Don&apos;t have an account? Sign Up
        </Button>
      </CardFooter>
    </Card>
  );
}

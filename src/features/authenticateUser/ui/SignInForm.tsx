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
import { signUp } from "../actions/signUp";

export function SignInForm() {
  const [state, formAction, isPending] = useActionState(signUp, null);
  const router = useRouter();

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Enter your credentials to login</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
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
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>
          {/* {error && (
            <div className="flex items-center gap-2 mt-4 text-red-500">
              <AlertCircle size={16} />
              <span className="text-sm">{error}</span>
            </div>
          )} */}
          <Button className="w-full mt-6" disabled={isPending}>
            Login
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button variant="link" onClick={() => router.push("/sign-up")}>
          Don't have an account? Sign Up
        </Button>
      </CardFooter>
    </Card>
  );
}

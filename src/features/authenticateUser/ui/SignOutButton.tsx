"use client";

import { Button } from "@/shared/ui/button";
import { signOut } from "../actions/signOut";

export function SignOutButton() {
  return <Button onClick={signOut}>Sign out</Button>;
}

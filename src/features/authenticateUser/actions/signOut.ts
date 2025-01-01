"use server";

import { SessionService } from "@/entities/session";
import { redirect } from "next/navigation";

export async function signOut() {
  await SessionService.deleteSession();
  redirect("/sign-in");
}

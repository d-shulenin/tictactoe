"use server";

import { Session } from "@/entities/session";
import { userService } from "@/entities/user/service";
import { redirect } from "next/navigation";
import { z } from "zod";

const signInSchema = z.object({
  login: z.string().trim(),
  password: z.string().trim(),
});

export async function signIn(prevState: unknown, formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  const dataValidation = signInSchema.safeParse(data);

  if (!dataValidation.success) {
    return {
      errors: dataValidation.error.flatten().fieldErrors,
    };
  }

  const { login, password } = dataValidation.data;

  try {
    const user = await userService.login(login, password);
    await Session.createSession(user.id);
  } catch (error) {
    return {
      error: error instanceof Error ? error : new Error("Failed to sign in"),
    };
  }

  redirect("/");
}

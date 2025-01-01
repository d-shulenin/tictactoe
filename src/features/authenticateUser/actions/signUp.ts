"use server";

import { Session } from "@/entities/session";
import { userService } from "@/entities/user/service";
import { redirect } from "next/navigation";
import { z } from "zod";

const signUpSchema = z.object({
  login: z
    .string()
    .min(4, { message: "Login must be at least 4 characters long" })
    .trim(),
  password: z
    .string()
    .min(8, { message: "be at least 8 characters long" })
    .regex(/[a-zA-Z]/, {
      message: "contain at least one letter",
    })
    .regex(/[0-9]/, { message: "contain at least one number" })
    .regex(/[^a-zA-Z0-9]/, {
      message: "contain at least one special character",
    })
    .trim(),
});

export async function signUp(prevState: unknown, formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  const dataValidation = signUpSchema.safeParse(data);

  if (!dataValidation.success) {
    return {
      errors: dataValidation.error.flatten().fieldErrors,
    };
  }

  const { login, password } = dataValidation.data;

  try {
    const user = await userService.create(login, password);
    await Session.createSession(user.id);
  } catch (error) {
    return {
      error: error instanceof Error ? error : new Error("Failed to sign up"),
    };
  }

  redirect("/");
}

"use server";

import { stringSchema } from "@/shared/lib/validation";
import { gameService } from "@/entities/game";
import { redirect } from "next/navigation";

export async function createGameAction(prevState: unknown, formData: FormData) {
  const name = formData.get("name");
  const nameValidation = stringSchema.safeParse(name);

  if (!nameValidation.success) {
    return {
      error: nameValidation.error, //TODO: change error because of bad message format
    };
  }

  let newGameId;

  try {
    const { id } = await gameService.create(nameValidation.data);
    newGameId = id;
  } catch (error) {
    return {
      error:
        error instanceof Error ? error : new Error("Failed to create new game"),
    };
  }

  redirect(`/game/${newGameId}`);
}

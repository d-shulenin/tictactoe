"use server";

import { stringSchema } from "@/shared/lib/validation";
import { gameService } from "@/entities/game";
import { ValidationError, ApiError } from "@/shared/lib/errors";
import { redirect } from "next/navigation";

export async function createGameAction(prevState: unknown, formData: FormData) {
  const name = formData.get("name");
  const nameValidation = stringSchema.safeParse(name);

  if (!nameValidation.success) {
    return {
      error: new ValidationError("Game name must be at least 1 character"),
    };
  }

  let newGameId;

  try {
    const { id } = await gameService.create(nameValidation.data);
    newGameId = id;
  } catch (e) {
    console.dir(e);
    return {
      error: new ApiError("Failed to create new game"),
    };
  }

  redirect(`/game/${newGameId}`);
}

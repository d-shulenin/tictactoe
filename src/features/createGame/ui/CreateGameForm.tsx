"use client";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { createGameAction } from "../actions/createGame";
import { useActionState, useEffect } from "react";
import { useToast } from "@/shared/lib/react/use-toast";

export function CreateGameForm() {
  const [state, formAction, isPending] = useActionState(createGameAction, null);
  const { toast } = useToast();

  useEffect(() => {
    if (state && "error" in state) {
      toast({
        title: state.error.name,
        description: state.error.message,
        variant: "destructive",
      });
    }
  }, [state]);

  return (
    <form action={formAction}>
      <Input name="name" />
      <Button aria-disabled={isPending}>Submit</Button>
    </form>
  );
}

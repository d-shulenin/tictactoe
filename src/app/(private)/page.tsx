import { CreateGameForm } from "@/features/createGame/";
import { GamesList } from "@/features/showGames";
import { Toaster } from "@/shared/ui/toaster";

export default function Home() {
  return (
    <div>
      <GamesList />
      <CreateGameForm />
      <Toaster />
    </div>
  );
}

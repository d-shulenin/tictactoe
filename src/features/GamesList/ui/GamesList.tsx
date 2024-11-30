import { gameService, GameStatus } from "@/entities/game";

export async function GamesList() {
  const idleGames = await gameService.getAllByStatus(GameStatus.IDLE);

  return (
    <ul>
      {idleGames.map((game) => (
        <li key={game.id}>{game.name}</li>
      ))}
    </ul>
  );
}

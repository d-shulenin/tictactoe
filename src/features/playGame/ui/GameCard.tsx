import { gameService, type Game } from "@/entities/game";
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";

interface GameCardProps {
  gameId: Game["id"];
}

export async function GameCard({ gameId }: GameCardProps) {
  const game = await gameService.findById(gameId);

  return (
    <Card className="w-[300px]">
      <CardHeader>
        <CardTitle className="text-center">{game.name}</CardTitle>
        <p className="text-center text-sm text-muted-foreground">
          {game.status}
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-2">
          {game.grid.map((symbol, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-20 text-2xl font-bold"
            >
              {symbol}
            </Button>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Reset Game</Button>
      </CardFooter>
    </Card>
  );
}

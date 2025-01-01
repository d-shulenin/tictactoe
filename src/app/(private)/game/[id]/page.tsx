import { GameCard } from "@/features/playGame";

export default async function GamePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  return (
    <div>
      <GameCard gameId={id} />
    </div>
  );
}

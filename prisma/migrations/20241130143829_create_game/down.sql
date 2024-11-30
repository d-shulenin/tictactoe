-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_guestId_fkey";

-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_winnerId_fkey";

-- AlterTable
ALTER TABLE "Game" ALTER COLUMN "startedAt" SET NOT NULL,
ALTER COLUMN "overAt" SET NOT NULL,
ALTER COLUMN "isDraw" SET NOT NULL,
ALTER COLUMN "guestId" SET NOT NULL,
ALTER COLUMN "winnerId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_guestId_fkey" FOREIGN KEY ("guestId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_winnerId_fkey" FOREIGN KEY ("winnerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- remove the last migration from the _prisma_migrations table
DELETE FROM _prisma_migrations WHERE migration_name = '20241130143829_create_game';

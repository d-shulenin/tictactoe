-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_winnerId_fkey";

-- DropIndex
DROP INDEX "Game_winnerId_key";

-- AlterTable
ALTER TABLE "Game" DROP COLUMN "grid",
DROP COLUMN "winnerId";

-- remove the last migration from the _prisma_migrations table
DELETE FROM _prisma_migrations WHERE migration_name = '20241129212633_game_grid';

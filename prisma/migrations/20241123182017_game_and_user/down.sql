-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_hostId_fkey";

-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_guestId_fkey";

-- DropIndex
DROP INDEX "Game_hostId_key";

-- DropIndex
DROP INDEX "Game_guestId_key";

-- AlterTable
ALTER TABLE "Game" DROP COLUMN "createdAt",
DROP COLUMN "guestId",
DROP COLUMN "hostId",
DROP COLUMN "isDraw",
DROP COLUMN "overAt",
DROP COLUMN "startedAt",
DROP COLUMN "status";

-- DropTable
DROP TABLE "User";

-- DropEnum
DROP TYPE "GameStatus";

-- remove the last migration from the _prisma_migrations table
DELETE FROM _prisma_migrations WHERE migration_name = '20241123182017_game_and_user';

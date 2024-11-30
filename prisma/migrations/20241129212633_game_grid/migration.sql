/*
  Warnings:

  - A unique constraint covering the columns `[winnerId]` on the table `Game` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `grid` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `winnerId` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "grid" JSONB NOT NULL,
ADD COLUMN     "winnerId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Game_winnerId_key" ON "Game"("winnerId");

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_winnerId_fkey" FOREIGN KEY ("winnerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

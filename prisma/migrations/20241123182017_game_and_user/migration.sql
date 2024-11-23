/*
  Warnings:

  - A unique constraint covering the columns `[hostId]` on the table `Game` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[guestId]` on the table `Game` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `guestId` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hostId` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isDraw` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `overAt` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startedAt` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "GameStatus" AS ENUM ('idle', 'inProgress', 'over');

-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "guestId" TEXT NOT NULL,
ADD COLUMN     "hostId" TEXT NOT NULL,
ADD COLUMN     "isDraw" BOOLEAN NOT NULL,
ADD COLUMN     "overAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "status" "GameStatus" NOT NULL;

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_login_key" ON "User"("login");

-- CreateIndex
CREATE UNIQUE INDEX "Game_hostId_key" ON "Game"("hostId");

-- CreateIndex
CREATE UNIQUE INDEX "Game_guestId_key" ON "Game"("guestId");

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_guestId_fkey" FOREIGN KEY ("guestId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

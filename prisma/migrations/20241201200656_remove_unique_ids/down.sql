-- CreateIndex
CREATE UNIQUE INDEX "Game_guestId_key" ON "Game"("guestId" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "Game_hostId_key" ON "Game"("hostId" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "Game_winnerId_key" ON "Game"("winnerId" ASC);

-- remove the last migration from the _prisma_migrations table
DELETE FROM _prisma_migrations WHERE migration_name = '20241201200656_remove_unique_ids';

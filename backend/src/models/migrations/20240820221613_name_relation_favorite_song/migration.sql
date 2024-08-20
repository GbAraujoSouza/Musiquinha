/*
  Warnings:

  - You are about to drop the `_FavoritesToSong` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_FavoritesToSong" DROP CONSTRAINT "_FavoritesToSong_A_fkey";

-- DropForeignKey
ALTER TABLE "_FavoritesToSong" DROP CONSTRAINT "_FavoritesToSong_B_fkey";

-- DropTable
DROP TABLE "_FavoritesToSong";

-- CreateTable
CREATE TABLE "_FavoriteSong" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FavoriteSong_AB_unique" ON "_FavoriteSong"("A", "B");

-- CreateIndex
CREATE INDEX "_FavoriteSong_B_index" ON "_FavoriteSong"("B");

-- AddForeignKey
ALTER TABLE "_FavoriteSong" ADD CONSTRAINT "_FavoriteSong_A_fkey" FOREIGN KEY ("A") REFERENCES "Favorites"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoriteSong" ADD CONSTRAINT "_FavoriteSong_B_fkey" FOREIGN KEY ("B") REFERENCES "Song"("id") ON DELETE CASCADE ON UPDATE CASCADE;

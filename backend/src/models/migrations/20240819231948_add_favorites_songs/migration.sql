-- CreateTable
CREATE TABLE "Favorites" (
    "userId" TEXT NOT NULL,

    CONSTRAINT "Favorites_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "_FavoritesToSong" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FavoritesToSong_AB_unique" ON "_FavoritesToSong"("A", "B");

-- CreateIndex
CREATE INDEX "_FavoritesToSong_B_index" ON "_FavoritesToSong"("B");

-- AddForeignKey
ALTER TABLE "Favorites" ADD CONSTRAINT "Favorites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoritesToSong" ADD CONSTRAINT "_FavoritesToSong_A_fkey" FOREIGN KEY ("A") REFERENCES "Favorites"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoritesToSong" ADD CONSTRAINT "_FavoritesToSong_B_fkey" FOREIGN KEY ("B") REFERENCES "Song"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AlterTable
ALTER TABLE "Story" ADD COLUMN     "totalFavorite" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "FavoriteStory" (
    "id" UUID NOT NULL,
    "storyId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FavoriteStory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FavoriteStory_storyId_userId_key" ON "FavoriteStory"("storyId", "userId");

-- AddForeignKey
ALTER TABLE "FavoriteStory" ADD CONSTRAINT "FavoriteStory_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "Story"("id") ON DELETE CASCADE ON UPDATE CASCADE;

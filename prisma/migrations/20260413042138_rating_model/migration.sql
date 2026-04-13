/*
  Warnings:

  - You are about to drop the column `rating` on the `Story` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Story_title_key";

-- AlterTable
ALTER TABLE "Story" DROP COLUMN "rating",
ADD COLUMN     "hidden" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE "Rating" (
    "id" UUID NOT NULL,
    "storyId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "number" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Rating_storyId_userId_key" ON "Rating"("storyId", "userId");

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "Story"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

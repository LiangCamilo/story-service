/*
  Warnings:

  - You are about to drop the column `subgenreId` on the `Story` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Story" DROP CONSTRAINT "Story_subgenreId_fkey";

-- AlterTable
ALTER TABLE "Story" DROP COLUMN "subgenreId",
ADD COLUMN     "secondaryGenreId" UUID;

-- AddForeignKey
ALTER TABLE "Story" ADD CONSTRAINT "Story_secondaryGenreId_fkey" FOREIGN KEY ("secondaryGenreId") REFERENCES "Genre"("id") ON DELETE SET NULL ON UPDATE CASCADE;

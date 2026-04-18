/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Story` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Story" ADD COLUMN     "totalChapters" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "Story_title_key" ON "Story"("title");

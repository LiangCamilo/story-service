/*
  Warnings:

  - You are about to drop the column `userEmail` on the `Story` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Chapter" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Story" DROP COLUMN "userEmail",
ALTER COLUMN "updatedAt" DROP NOT NULL;

/*
  Warnings:

  - Added the required column `userEmail` to the `Story` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Story" ADD COLUMN     "coverUrl" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "userEmail" TEXT NOT NULL;

/*
  Warnings:

  - You are about to alter the column `score` on the `Rating` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(4,2)`.

*/
-- AlterTable
ALTER TABLE "Rating" ALTER COLUMN "score" SET DATA TYPE DECIMAL(4,2);

-- AlterTable
ALTER TABLE "Story" ADD COLUMN     "totalRating" DECIMAL(4,2) NOT NULL DEFAULT 0;

-- CreateEnum
CREATE TYPE "StoryStatus" AS ENUM ('IN_PROGRESS', 'COMPLETED', 'ABANDONED', 'PAUSED');

-- AlterTable
ALTER TABLE "Story" ADD COLUMN     "status" "StoryStatus" NOT NULL DEFAULT 'IN_PROGRESS',
ADD COLUMN     "totalViews" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "View" (
    "id" UUID NOT NULL,
    "storyId" UUID NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "View_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "View_storyId_userId_key" ON "View"("storyId", "userId");

-- AddForeignKey
ALTER TABLE "View" ADD CONSTRAINT "View_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "Story"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

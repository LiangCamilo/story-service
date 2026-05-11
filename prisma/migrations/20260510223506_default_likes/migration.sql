-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "likes" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Tag" ALTER COLUMN "updatedAt" DROP NOT NULL;

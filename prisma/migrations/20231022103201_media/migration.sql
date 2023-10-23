-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_commentId_fkey";

-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_tweetId_fkey";

-- AlterTable
ALTER TABLE "Media" ALTER COLUMN "tweetId" DROP NOT NULL,
ALTER COLUMN "commentId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_tweetId_fkey" FOREIGN KEY ("tweetId") REFERENCES "Tweet"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

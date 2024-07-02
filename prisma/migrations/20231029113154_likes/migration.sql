-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_tweetId_fkey";

-- AlterTable
ALTER TABLE "Like" ALTER COLUMN "tweetId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_tweetId_fkey" FOREIGN KEY ("tweetId") REFERENCES "Tweet"("id") ON DELETE SET NULL ON UPDATE CASCADE;

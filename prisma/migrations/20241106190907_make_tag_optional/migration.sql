-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_tagId_fkey";

-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "tagId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE SET NULL ON UPDATE CASCADE;

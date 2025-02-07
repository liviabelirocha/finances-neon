-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_boardId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_boardId_fkey";

-- DropForeignKey
ALTER TABLE "UserBoard" DROP CONSTRAINT "UserBoard_boardId_fkey";

-- AddForeignKey
ALTER TABLE "UserBoard" ADD CONSTRAINT "UserBoard_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE CASCADE ON UPDATE CASCADE;

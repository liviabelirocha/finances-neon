-- CreateEnum
CREATE TYPE "TransactionMethod" AS ENUM ('PIX', 'CARD', 'CASH', 'OTHER');

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "method" "TransactionMethod" NOT NULL DEFAULT 'OTHER';

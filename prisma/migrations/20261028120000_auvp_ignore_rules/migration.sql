-- AlterTable
ALTER TABLE "BoardIntegration" ADD COLUMN     "auvpIgnoredBudgetIds" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
ADD COLUMN     "auvpIgnoredTagIds" INTEGER[] DEFAULT ARRAY[]::INTEGER[];


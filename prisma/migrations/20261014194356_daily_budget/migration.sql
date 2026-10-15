-- CreateTable
CREATE TABLE "BoardIntegration" (
    "id" TEXT NOT NULL,
    "boardId" TEXT NOT NULL,
    "auvpApiKey" TEXT,
    "auvpValidatedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BoardIntegration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BoardIntegration_boardId_key" ON "BoardIntegration"("boardId");

-- AddForeignKey
ALTER TABLE "BoardIntegration" ADD CONSTRAINT "BoardIntegration_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "ExpectedIncome" (
    "id" TEXT NOT NULL,
    "boardId" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExpectedIncome_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ExpectedIncome_boardId_year_month_key" ON "ExpectedIncome"("boardId", "year", "month");

-- AddForeignKey
ALTER TABLE "ExpectedIncome" ADD CONSTRAINT "ExpectedIncome_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE CASCADE ON UPDATE CASCADE;


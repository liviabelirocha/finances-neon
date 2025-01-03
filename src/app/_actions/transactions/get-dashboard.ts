import { TransactionType } from "@prisma/client";
import { getTransactionsSummaryByType } from "./summary-by-type";
import { Dashboard } from "./types";

export const getDashboard = async ({
  boardId,
  month,
  year,
}: {
  boardId: string;
  month: number;
  year: number;
}): Promise<Dashboard> => {
  const summaryByType = await getTransactionsSummaryByType({
    boardId,
    month,
    year,
  });

  const invested =
    summaryByType.INVESTMENT - summaryByType.INVESTMENT_WITHDRAWAL;

  const totalAmount =
    summaryByType.INCOME + invested + summaryByType.EXPENSE || 1;

  const summary = {
    [TransactionType.INCOME]: {
      percentage: Math.round((summaryByType.INCOME / totalAmount) * 100),
      total: summaryByType.INCOME,
    },
    [TransactionType.EXPENSE]: {
      percentage: Math.round((summaryByType.EXPENSE / totalAmount) * 100),
      total: summaryByType.EXPENSE,
    },
    [TransactionType.INVESTMENT]: {
      percentage: Math.round((invested / totalAmount) * 100),
      total: invested,
    },
  };

  return { summary };
};

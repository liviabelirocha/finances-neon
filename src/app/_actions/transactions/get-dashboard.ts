import { TransactionType } from "@prisma/client";
import { set } from "date-fns";
import { monthTransactions } from "./month-transactions";
import { getTransactionsSummaryByCategory } from "./summary-by-category";
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
  const initialDate = set(new Date(), {
    month,
    year,
    date: 1,
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });

  // by type
  const summaryByType = await getTransactionsSummaryByType({
    boardId,
    initialDate,
  });

  const invested =
    summaryByType.INVESTMENT - summaryByType.INVESTMENT_WITHDRAWAL;

  const totalAmount =
    summaryByType.INCOME + invested + summaryByType.EXPENSE || 1;

  const summary: Dashboard["summary"] = {
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

  // by category
  const summaryByCategory = await getTransactionsSummaryByCategory({
    boardId,
    initialDate,
  });

  const categoriesTotal = Object.values(summaryByCategory).reduce(
    (acc, curr) => acc + curr,
    0,
  );

  const categoriesSummary = {} as Dashboard["categoriesSummary"];

  Object.keys(summaryByCategory).forEach((category) => {
    categoriesSummary[category] = {
      percentage: Math.round(
        (summaryByCategory[category] / categoriesTotal) * 100,
      ),
      total: summaryByCategory[category],
    };
  });

  // last transactions
  const lastTransactions = await monthTransactions({ boardId, initialDate });

  return {
    summary,
    categoriesSummary,
    lastTransactions,
  };
};

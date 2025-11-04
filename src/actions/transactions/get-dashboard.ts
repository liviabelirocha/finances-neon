import { VisualizationType } from "@/app/(app)/[board]/(dashboard)/_components/visualization-tabs";
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
  visualization,
}: {
  boardId: string;
  month: number;
  year: number;
  visualization: VisualizationType;
}): Promise<Dashboard> => {
  const initialMonth = visualization === "monthly" ? month : 0;

  const initialDate =
    visualization === "all-time"
      ? undefined
      : set(new Date(), {
          month: initialMonth,
          year,
          date: 1,
          hours: 0,
          minutes: 0,
          seconds: 0,
          milliseconds: 0,
        });

  const endDate =
    visualization === "monthly" || visualization === "all-time"
      ? undefined
      : set(new Date(), {
          month: 11,
          year,
          date: 31,
          hours: 23,
          minutes: 59,
          seconds: 59,
          milliseconds: 59,
        });

  // by type
  const summaryByType = await getTransactionsSummaryByType({
    boardId,
    initialDate,
    endDate,
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
    endDate,
  });

  const categoriesTotal = Object.values(summaryByCategory).reduce(
    (acc, curr) => acc + curr,
    0,
  );

  const sortedCategoriesSummary = Object.entries(summaryByCategory)
    .map(([category, total]) => ({
      category,
      total,
      percentage: Math.round((total / categoriesTotal) * 100),
    }))
    .sort((a, b) => b.percentage - a.percentage)
    .reduce(
      (acc, { category, total, percentage }) => {
        acc[category] = { total, percentage };
        return acc;
      },
      {} as Dashboard["categoriesSummary"],
    );

  // last transactions
  const lastTransactions = await monthTransactions({
    boardId,
    initialDate,
    endDate,
  });

  return {
    summary,
    categoriesSummary: sortedCategoriesSummary,
    lastTransactions,
  };
};

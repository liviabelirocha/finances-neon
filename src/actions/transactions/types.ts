import { Transaction } from "@prisma/client";

type Summary = {
  percentage: number;
  total: number;
};

export type Dashboard = {
  summary: {
    INCOME: Summary;
    EXPENSE: Summary;
    INVESTMENT: Summary;
  };
  categoriesSummary: Record<string, Summary>;
  lastTransactions: Transaction[];
};

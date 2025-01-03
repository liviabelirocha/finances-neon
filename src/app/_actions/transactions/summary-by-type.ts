"use server";

import { db } from "@/_lib/prisma";
import { add, set } from "date-fns";

export const getTransactionsSummaryByType = async ({
  boardId,
  month,
  year,
}: {
  boardId: string;
  month: number;
  year: number;
}) => {
  const initialDate = set(new Date(), { month, year, date: 1 });

  const transactions = await db.transaction.groupBy({
    where: {
      boardId,
      date: {
        gte: initialDate,
        lt: add(initialDate, {
          months: 1,
        }),
      },
    },
    _sum: { amount: true },
    by: ["type"],
  });

  return transactions.reduce(
    (acc, item) => {
      if (item._sum.amount) acc[item.type] += item._sum.amount;
      return acc;
    },
    { INCOME: 0, EXPENSE: 0, INVESTMENT: 0, INVESTMENT_WITHDRAWAL: 0 },
  );
};

"use server";

import { db } from "@/lib/prisma";
import { add } from "date-fns";

export const getTransactionsSummaryByType = async ({
  boardId,
  initialDate,
  endDate,
}: {
  boardId: string;
  initialDate?: Date;
  endDate?: Date;
}) => {
  const transactions = await db.transaction.groupBy({
    where: {
      boardId,
      ...(initialDate && {
        date: {
          gte: initialDate,
          lt:
            endDate ??
            add(initialDate, {
              months: 1,
            }),
        },
      }),
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

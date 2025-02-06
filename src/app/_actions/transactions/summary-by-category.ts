"use server";

import { db } from "@/_lib/prisma";
import { add } from "date-fns";

export const getTransactionsSummaryByCategory = async ({
  boardId,
  initialDate,
}: {
  boardId: string;
  initialDate: Date;
}) => {
  const transactions = await db.transaction.groupBy({
    where: {
      boardId,
      type: "EXPENSE",
      date: {
        gte: initialDate,
        lt: add(initialDate, {
          months: 1,
        }),
      },
    },
    _sum: { amount: true },
    by: ["tagId"],
  });

  const tags = await db.tag.findMany({
    where: { id: { in: transactions.map((t) => t.tagId ?? "") } },
  });

  const tagMap = Object.fromEntries(tags.map((tag) => [tag.id, tag.name]));

  return transactions.reduce(
    (acc, item) => {
      if (item._sum.amount) {
        const tagName = item.tagId ? tagMap[item.tagId] : "Unknown";
        acc[tagName] = (acc[tagName] || 0) + item._sum.amount;
      }
      return acc;
    },
    {} as Record<string, number>,
  );
};

"use server";

import { db } from "@/lib/prisma";
import { dateRange } from "@/lib/date";

export const getTransactionsSummaryByCategory = async ({
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
      type: "EXPENSE",
      ...(initialDate && {
        date: dateRange(initialDate, endDate),
      }),
      recurring: false,
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

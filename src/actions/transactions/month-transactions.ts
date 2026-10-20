"use server";

import { db } from "@/lib/prisma";
import { dateRange } from "@/lib/date";

export const monthTransactions = async ({
  boardId,
  initialDate,
  endDate,
}: {
  boardId: string;
  initialDate?: Date;
  endDate?: Date;
}) => {
  const transactions = await db.transaction.findMany({
    where: {
      boardId,
      ...(initialDate && {
        date: dateRange(initialDate, endDate),
      }),
      recurring: false,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      tag: true,
    },
  });

  return transactions;
};

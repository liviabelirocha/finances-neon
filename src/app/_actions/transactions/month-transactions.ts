"use server";

import { db } from "@/_lib/prisma";
import { add } from "date-fns";

export const monthTransactions = async ({
  boardId,
  initialDate,
}: {
  boardId: string;
  initialDate: Date;
}) => {
  const transactions = await db.transaction.findMany({
    where: {
      boardId,
      date: {
        gte: initialDate,
        lt: add(initialDate, {
          months: 1,
        }),
      },
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

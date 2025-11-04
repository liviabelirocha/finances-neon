"use server";

import { db } from "@/lib/prisma";
import { add } from "date-fns";

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
    orderBy: {
      createdAt: "desc",
    },
    include: {
      tag: true,
    },
  });

  return transactions;
};

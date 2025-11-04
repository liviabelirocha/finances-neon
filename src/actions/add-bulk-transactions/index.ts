"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { AddBulkTransactionsSchema, addBulkTransactionsSchema } from "./schema";

export const addBulkTransactions = async ({
  boardId,
  transactions,
}: AddBulkTransactionsSchema) => {
  addBulkTransactionsSchema.parse({ boardId, transactions });

  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized");

  await db.transaction.createMany({
    data: transactions.map((transaction) => ({
      ...transaction,
      boardId,
    })),
  });

  revalidatePath("/[board]/transactions");
};

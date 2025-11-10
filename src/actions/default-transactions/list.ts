"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const listDefaultTransactions = async (boardId: string) => {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized");

  const transactions = db.transaction.findMany({
    where: { boardId, recurring: true },
  });

  return transactions;
};

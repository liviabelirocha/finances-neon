"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const listDefaultTransactions = async (boardId: string) => {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized");

  const userBoard = await db.userBoard.findFirst({
    where: { userId, boardId },
  });

  if (!userBoard) throw new Error("Unauthorized");

  return db.transaction.findMany({
    where: { boardId, recurring: true },
    include: { tag: true },
    orderBy: { name: "asc" },
  });
};

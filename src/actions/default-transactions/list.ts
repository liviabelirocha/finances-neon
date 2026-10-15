"use server";

import { assertBoardMember } from "@/lib/board-member";
import { db } from "@/lib/prisma";

export const listDefaultTransactions = async (boardId: string) => {
  await assertBoardMember(boardId);

  return db.transaction.findMany({
    where: { boardId, recurring: true },
    include: { tag: true },
    orderBy: { name: "asc" },
  });
};

"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const getBoard = async (boardId: string) => {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized");

  const userBoard = await db.userBoard.findFirst({
    where: { boardId, userId },
  });

  if (!userBoard) throw new Error("Not a member of this board");

  const board = await db.board.findUnique({
    where: { id: boardId },
  });

  return board;
};

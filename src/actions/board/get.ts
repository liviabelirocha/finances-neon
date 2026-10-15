"use server";

import { assertBoardMember } from "@/lib/board-member";
import { db } from "@/lib/prisma";

export const getBoard = async (boardId: string) => {
  await assertBoardMember(boardId);

  const board = await db.board.findUnique({
    where: { id: boardId },
  });

  return board;
};

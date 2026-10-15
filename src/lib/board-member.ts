import "server-only";

import { auth } from "@clerk/nextjs/server";
import { db } from "./prisma";

/** Throws unless the signed-in user belongs to the board; returns their id. */
export const assertBoardMember = async (boardId: string) => {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized");

  const userBoard = await db.userBoard.findFirst({
    where: { boardId, userId },
  });

  if (!userBoard) throw new Error("Not a member of this board");

  return userId;
};

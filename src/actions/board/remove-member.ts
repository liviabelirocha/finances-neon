"use server";

import { assertBoardMember } from "@/lib/board-member";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const removeBoardMember = async ({
  boardId,
  userId,
}: {
  boardId: string;
  userId: string;
}) => {
  const currentUserId = await assertBoardMember(boardId);

  if (userId === currentUserId)
    throw new Error("Cannot remove yourself. Use leave board instead.");

  await db.userBoard.deleteMany({
    where: { boardId, userId },
  });

  revalidatePath(`/${boardId}/settings/general`);
};

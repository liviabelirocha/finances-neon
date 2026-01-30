"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const removeBoardMember = async ({
  boardId,
  userId,
}: {
  boardId: string;
  userId: string;
}) => {
  const { userId: currentUserId } = await auth();

  if (!currentUserId) throw new Error("Unauthorized");

  const currentUserBoard = await db.userBoard.findFirst({
    where: { boardId, userId: currentUserId },
  });

  if (!currentUserBoard) throw new Error("Not a member of this board");

  if (userId === currentUserId)
    throw new Error("Cannot remove yourself. Use leave board instead.");

  await db.userBoard.deleteMany({
    where: { boardId, userId },
  });

  revalidatePath(`/${boardId}/settings/general`);
};

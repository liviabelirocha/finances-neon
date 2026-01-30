"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const updateBoard = async ({
  boardId,
  name,
}: {
  boardId: string;
  name: string;
}) => {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized");

  const userBoard = await db.userBoard.findFirst({
    where: { boardId, userId },
  });

  if (!userBoard) throw new Error("Not a member of this board");

  await db.board.update({
    where: { id: boardId },
    data: { name: name.trim() },
  });

  revalidatePath(`/${boardId}`);
  revalidatePath(`/${boardId}/settings/general`);
  revalidatePath("/");
};

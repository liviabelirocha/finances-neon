"use server";

import { assertBoardMember } from "@/lib/board-member";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const updateBoard = async ({
  boardId,
  name,
}: {
  boardId: string;
  name: string;
}) => {
  await assertBoardMember(boardId);

  await db.board.update({
    where: { id: boardId },
    data: { name: name.trim() },
  });

  revalidatePath(`/${boardId}`);
  revalidatePath(`/${boardId}/settings/general`);
  revalidatePath("/");
};

"use server";

import { assertBoardMember } from "@/lib/board-member";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const removeIntegration = async (boardId: string) => {
  await assertBoardMember(boardId);

  await db.boardIntegration.updateMany({
    where: { boardId },
    data: { auvpApiKey: null, auvpValidatedAt: null },
  });

  revalidatePath(`/${boardId}/settings/integrations`);
  revalidatePath(`/${boardId}/cash-flow`);
};

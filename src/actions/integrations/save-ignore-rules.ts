"use server";

import { assertBoardMember } from "@/lib/board-member";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { SaveIgnoreRulesSchema, saveIgnoreRulesSchema } from "./schema";

export const saveIgnoreRules = async (params: SaveIgnoreRulesSchema) => {
  const { boardId, budgetIds, tagIds } = saveIgnoreRulesSchema.parse(params);

  await assertBoardMember(boardId);

  await db.boardIntegration.update({
    where: { boardId },
    data: { auvpIgnoredBudgetIds: budgetIds, auvpIgnoredTagIds: tagIds },
  });

  revalidatePath(`/${boardId}/settings/integrations`);
  revalidatePath(`/${boardId}/cash-flow`);
};

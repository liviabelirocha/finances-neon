"use server";

import { listBudgets, listTags } from "@/lib/auvp";
import { assertBoardMember } from "@/lib/board-member";
import { getAuvpApiKey, getAuvpIgnoreRules } from "@/lib/integrations";

export const getIgnoreRules = async (boardId: string) => {
  await assertBoardMember(boardId);

  const auvpApiKey = await getAuvpApiKey(boardId);

  if (!auvpApiKey) return { status: "disabled" as const };

  const rules = await getAuvpIgnoreRules(boardId);

  // Options come from AUVP; a revoked key or an outage must not break the
  // settings page, since it is also where the key gets replaced.
  try {
    const [budgets, tags] = await Promise.all([
      listBudgets(auvpApiKey),
      listTags(auvpApiKey),
    ]);

    return {
      status: "ok" as const,
      budgets: budgets.map((budget) => ({ id: budget.id, name: budget.name })),
      tags: tags.map((tag) => ({ id: tag.id, name: tag.name })),
      ...rules,
    };
  } catch (error) {
    console.error(`Failed to load AUVP options for board ${boardId}`, error);
    return { status: "unavailable" as const };
  }
};

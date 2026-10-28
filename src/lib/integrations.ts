import "server-only";

import { decrypt } from "./crypto";
import { db } from "./prisma";

const getStoredAuvpApiKey = async (boardId: string) =>
  (
    await db.boardIntegration.findUnique({
      where: { boardId },
      select: { auvpApiKey: true },
    })
  )?.auvpApiKey ?? null;

/** Whether a key is stored, without decrypting it. */
export const hasAuvpApiKey = async (boardId: string) =>
  !!(await getStoredAuvpApiKey(boardId));

/** The decrypted key, or null when there is none or it can't be decrypted
 * (e.g. INTEGRATIONS_ENCRYPTION_KEY was rotated or is missing). */
export const getAuvpApiKey = async (boardId: string) => {
  const stored = await getStoredAuvpApiKey(boardId);

  if (!stored) return null;

  try {
    return decrypt(stored);
  } catch (error) {
    console.error(`Failed to decrypt AUVP API key for board ${boardId}`, error);
    return null;
  }
};

export const getAuvpIgnoreRules = async (boardId: string) => {
  const integration = await db.boardIntegration.findUnique({
    where: { boardId },
    select: { auvpIgnoredBudgetIds: true, auvpIgnoredTagIds: true },
  });

  return {
    budgetIds: integration?.auvpIgnoredBudgetIds ?? [],
    tagIds: integration?.auvpIgnoredTagIds ?? [],
  };
};

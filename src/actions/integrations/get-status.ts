"use server";

import { assertBoardMember } from "@/lib/board-member";
import { getAuvpApiKey, hasAuvpApiKey } from "@/lib/integrations";

export const getIntegrationStatus = async (boardId: string) => {
  await assertBoardMember(boardId);

  const configured = await hasAuvpApiKey(boardId);
  const auvpApiKey = configured ? await getAuvpApiKey(boardId) : null;

  return {
    configured,
    /** Null when the stored key can't be decrypted and must be replaced. */
    last4: auvpApiKey ? auvpApiKey.slice(-4) : null,
  };
};

export const isIntegrationConfigured = async (boardId: string) => {
  await assertBoardMember(boardId);

  return hasAuvpApiKey(boardId);
};

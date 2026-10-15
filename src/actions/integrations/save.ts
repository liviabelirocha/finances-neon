"use server";

import { validateAuvpKey } from "@/lib/auvp";
import { encrypt } from "@/lib/crypto";
import { assertBoardMember } from "@/lib/board-member";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { SaveIntegrationSchema, saveIntegrationSchema } from "./schema";

export const saveIntegration = async (params: SaveIntegrationSchema) => {
  const { boardId, apiKey } = saveIntegrationSchema.parse(params);

  await assertBoardMember(boardId);

  if (!(await validateAuvpKey(apiKey))) return { success: false as const };

  const data = { auvpApiKey: encrypt(apiKey), auvpValidatedAt: new Date() };

  await db.boardIntegration.upsert({
    where: { boardId },
    create: { boardId, ...data },
    update: data,
  });

  revalidatePath(`/${boardId}/settings/integrations`);
  revalidatePath(`/${boardId}/cash-flow`);

  return { success: true as const };
};

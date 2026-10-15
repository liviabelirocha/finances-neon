"use server";

import { assertBoardMember } from "@/lib/board-member";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import {
  UpsertExpectedIncomeSchema,
  upsertExpectedIncomeSchema,
} from "./schema";

export const upsertExpectedIncome = async (
  params: UpsertExpectedIncomeSchema,
) => {
  const { boardId, year, month, amount } =
    upsertExpectedIncomeSchema.parse(params);

  await assertBoardMember(boardId);

  await db.expectedIncome.upsert({
    where: { boardId_year_month: { boardId, year, month } },
    create: { boardId, year, month, amount },
    update: { amount },
  });

  revalidatePath(`/${boardId}/cash-flow`);
};

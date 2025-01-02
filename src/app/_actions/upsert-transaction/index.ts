"use server";

import { db } from "@/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { TransactionType } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { upsertTransactionSchema } from "./schema";

export const upsertTransaction = async (params: {
  id?: string;
  name: string;
  type: TransactionType;
  amount: number;
  boardId: string;
  tagId?: string;
  installments?: number;
  date: Date;
}) => {
  upsertTransactionSchema.parse(params);

  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized");

  if (params.installments && params.installments > 1) {
    const amount = Math.ceil(params.amount / params.installments);

    await db.transaction.createMany({
      data: Array.from({ length: params.installments }).map((_, idx) => ({
        name: `${params.name} (${idx + 1}/${params.installments})`,
        type: params.type,
        amount,
        boardId: params.boardId,
        date: params.date,
      })),
    });
  } else {
    await db.transaction.upsert({
      where: { id: params.id },
      update: { ...params },
      create: { ...params },
    });
  }

  revalidatePath("/[board]/transactions");
};

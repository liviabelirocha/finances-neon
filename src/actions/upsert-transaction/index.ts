"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { add } from "date-fns";
import { revalidatePath } from "next/cache";
import { UpsertTransactionSchema, upsertTransactionSchema } from "./schema";

export const upsertTransaction = async (params: UpsertTransactionSchema) => {
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
        date: add(params.date, { months: idx }),
        tagId: params.tagId,
        method: params.method,
      })),
    });
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, installments, ...data } = params;

    await db.transaction.upsert({
      where: { id },
      update: { ...data },
      create: { ...data },
    });
  }

  revalidatePath("/[board]/transactions");
};

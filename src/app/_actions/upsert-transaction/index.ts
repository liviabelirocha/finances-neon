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
}) => {
  upsertTransactionSchema.parse(params);

  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized");

  await db.transaction.upsert({
    where: { id: params.id },
    update: { ...params },
    create: { ...params },
  });

  revalidatePath("/[board]/transactions");
};

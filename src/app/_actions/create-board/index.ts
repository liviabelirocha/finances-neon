"use server";

import { db } from "@/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const createBoard = async ({ name }: { name: string }) => {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized");

  await db.userBoard.create({
    data: { userId, board: { create: { name } } },
  });

  revalidatePath("/");
};

"use server";

import { db } from "@/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const joinBoard = async ({ boardId }: { boardId: string }) => {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized");

  const isUserOnBoard = await db.userBoard.findFirst({
    where: { userId, boardId },
  });

  if (!isUserOnBoard)
    await db.userBoard.create({
      data: { userId, boardId },
    });

  revalidatePath("/");
  redirect(`/${boardId}`);
};

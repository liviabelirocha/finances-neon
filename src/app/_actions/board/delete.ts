"use server";

import { db } from "@/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const deleteBoard = async (id: string) => {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized");

  await db.board.delete({
    where: { id },
  });

  revalidatePath("/");
};

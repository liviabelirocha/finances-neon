"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const createTag = async ({
  name,
  boardId,
}: {
  name: string;
  boardId: string;
}) => {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized");

  const tag = await db.tag.create({
    data: { name, boardId },
  });

  return tag;
};

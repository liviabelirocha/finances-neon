"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const leaveBoard = async (boardId: string) => {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized");

  const memberCount = await db.userBoard.count({
    where: { boardId },
  });

  if (memberCount <= 1)
    throw new Error(
      "You are the last member of this board. Delete the board instead.",
    );

  await db.userBoard.deleteMany({
    where: { boardId, userId },
  });

  redirect("/");
};

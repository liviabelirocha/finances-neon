"use server";

import { db } from "@/lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";

export type BoardMember = {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  imageUrl: string;
  isCurrentUser: boolean;
};

export const getBoardMembers = async (
  boardId: string,
): Promise<BoardMember[]> => {
  const { userId: currentUserId } = await auth();

  if (!currentUserId) throw new Error("Unauthorized");

  const currentUserBoard = await db.userBoard.findFirst({
    where: { boardId, userId: currentUserId },
  });

  if (!currentUserBoard) throw new Error("Not a member of this board");

  const userBoards = await db.userBoard.findMany({
    where: { boardId },
  });

  const userIds = userBoards.map((ub) => ub.userId);

  const client = await clerkClient();
  const { data: users } = await client.users.getUserList({
    userId: userIds,
  });

  return users.map((user) => ({
    id: user.id,
    email: user.emailAddresses[0]?.emailAddress ?? "",
    firstName: user.firstName,
    lastName: user.lastName,
    imageUrl: user.imageUrl,
    isCurrentUser: user.id === currentUserId,
  }));
};

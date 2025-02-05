"use server";

import { db } from "@/_lib/prisma";

export const listTags = async (boardId: string) => {
  const categories = await db.tag.findMany({ where: { boardId } });
  return categories;
};

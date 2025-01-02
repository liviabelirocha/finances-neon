import { db } from "@/_lib/prisma";
import { redirect } from "next/navigation";
import React from "react";

export default async function Layout({
  params,
  children,
}: {
  params: Promise<{ board: string }>;
  children: React.ReactNode;
}) {
  const boardId = (await params).board;

  const board = await db.board.findUnique({
    where: { id: boardId },
  });

  if (!board) redirect("/");

  return children;
}

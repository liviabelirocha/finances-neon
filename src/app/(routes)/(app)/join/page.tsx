import { joinBoard } from "@/_actions/join-board";
import { db } from "@/_lib/prisma";
import { redirect } from "next/navigation";

export default async function JoinGroup({
  searchParams,
}: {
  searchParams: { board: string };
}) {
  const boardId = searchParams.board;

  const board = await db.board.findUnique({
    where: { id: boardId },
  });

  if (!board) redirect("/");

  return await joinBoard({ boardId: boardId });
}

import { DataTable } from "@/_components/ui/data-table";
import { db } from "@/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { columns } from "./_columns";
import { CreateBoardButton } from "./_components/create-board-button";

export default async function Home() {
  const { userId } = await auth();

  if (!userId) redirect("/login");

  const boards = await db.userBoard.findMany({
    where: {
      userId,
    },
    include: {
      board: true,
    },
  });

  return (
    <div className="space-y-6 p-6">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Boards</h1>
        <CreateBoardButton />
      </div>

      <DataTable columns={columns} data={boards} />
    </div>
  );
}

import { DataTable } from "@/components/ui/data-table";
import { auth } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { columns } from "./_columns";
import { CreateBoardButton } from "./_components/create-board-button";

export default async function Home() {
  const { userId } = await auth();

  const boards = await db.userBoard.findMany({
    where: {
      userId,
    },
    include: {
      board: true,
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:w-full sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl font-bold sm:text-2xl">Boards</h1>
        <CreateBoardButton />
      </div>

      <DataTable columns={columns} data={boards} />
    </div>
  );
}

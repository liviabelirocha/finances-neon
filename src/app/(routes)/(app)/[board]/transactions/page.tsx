import { AddTransactionButton } from "@/_components/add-transaction-button";
import { DataTable } from "@/_components/ui/data-table";
import { db } from "@/_lib/prisma";
import { columns } from "./_columns";

export default async function Page({
  params,
}: {
  params: Promise<{ board: string }>;
}) {
  const board = (await params).board;

  const transactions = await db.transaction.findMany({
    include: {
      tag: true,
    },
    where: { boardId: board },
    orderBy: {
      date: "asc",
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <AddTransactionButton />
      </div>

      <DataTable columns={columns} data={transactions} />
    </div>
  );
}

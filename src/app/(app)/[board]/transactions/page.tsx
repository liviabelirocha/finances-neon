import { AddTransactionButton } from "@/components/add-transaction-button";
import { DataTable } from "@/components/ui/data-table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { db } from "@/lib/prisma";
import { dateRange, monthStart, selectedMonth } from "@/lib/date";
import { columns } from "./_columns";
import { MonthPicker } from "./_components/month-picker";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ board: string }>;
  searchParams: { month?: string; year?: string };
}) {
  const board = (await params).board;

  const initialDate = monthStart(selectedMonth(searchParams));

  const transactions = await db.transaction.findMany({
    include: {
      tag: true,
    },
    where: {
      boardId: board,
      date: dateRange(initialDate),
      recurring: false,
    },
    orderBy: {
      date: "asc",
    },
  });

  return (
    <ScrollArea>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:w-full sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-xl font-bold sm:text-2xl">Transactions</h1>
          <div className="flex gap-2">
            <MonthPicker />
            <AddTransactionButton />
          </div>
        </div>

        <DataTable columns={columns} data={transactions} />
      </div>
    </ScrollArea>
  );
}

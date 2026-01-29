import { AddTransactionButton } from "@/components/add-transaction-button";
import { DataTable } from "@/components/ui/data-table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { db } from "@/lib/prisma";
import { add, set } from "date-fns";
import { columns } from "./_columns";
import { MonthPicker } from "./_components/month-picker";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ board: string }>;
  searchParams: { month?: number; year?: number };
}) {
  const board = (await params).board;

  const month = searchParams.month ?? new Date().getMonth();
  const year = searchParams.year ?? new Date().getFullYear();

  const initialDate = set(new Date(), {
    month,
    year,
    date: 1,
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });

  const transactions = await db.transaction.findMany({
    include: {
      tag: true,
    },
    where: {
      boardId: board,
      date: {
        gte: initialDate,
        lt: add(initialDate, {
          months: 1,
        }),
      },
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

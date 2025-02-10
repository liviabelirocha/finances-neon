import { AddTransactionButton } from "@/_components/add-transaction-button";
import { MonthSelector } from "@/_components/month-selector";
import { DataTable } from "@/_components/ui/data-table";
import { ScrollArea } from "@/_components/ui/scroll-area";
import { db } from "@/_lib/prisma";
import { add, set } from "date-fns";
import { columns } from "./_columns";

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
    },
    orderBy: {
      date: "asc",
    },
  });

  return (
    <ScrollArea>
      <div className="space-y-6">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold">Transactions</h1>
          <div className="flex gap-2">
            <MonthSelector month={month} year={year} />
            <AddTransactionButton />
          </div>
        </div>

        <DataTable columns={columns} data={transactions} />
      </div>
    </ScrollArea>
  );
}

import { Button } from "@/_components/ui/button";
import { DataTable } from "@/_components/ui/data-table";
import { db } from "@/_lib/prisma";
import { ArrowDownUpIcon } from "lucide-react";
import { columns } from "./_columns";

export default async function Page() {
  const transactions = await db.transaction.findMany({});

  return (
    <div className="space-y-6 p-6">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <Button className="rounded-full">
          Add transaction
          <ArrowDownUpIcon />
        </Button>
      </div>

      <DataTable columns={columns} data={transactions} />
    </div>
  );
}

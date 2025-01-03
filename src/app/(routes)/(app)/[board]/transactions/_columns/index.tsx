"use client";

import { Button } from "@/_components/ui/button";
import { moneyFormat } from "@/_lib/money-format";
import { Tag, Transaction } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { TrashIcon } from "lucide-react";
import { EditTransactionButton } from "../_components/edit-transaction-button";
import { TypeBadge } from "../_components/type-badge";

export const columns: ColumnDef<Transaction & { tag?: Tag | null }>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row: { original } }) => <TypeBadge type={original.type} />,
  },
  {
    accessorKey: "tag",
    header: "Category",
    cell: ({ row: { original } }) => original.tag?.name ?? "-",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row: { original } }) =>
      new Date(original.date).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row: { original } }) => moneyFormat(original.amount / 100),
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row: { original } }) => (
      <div className="flex justify-end space-x-1">
        <EditTransactionButton transaction={original} />
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <TrashIcon color="red" />
        </Button>
      </div>
    ),
  },
];

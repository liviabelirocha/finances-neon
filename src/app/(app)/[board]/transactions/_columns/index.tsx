"use client";

import { deleteTransaction } from "@/actions/delete-transaction";
import { DeleteButton } from "@/components/delete-button";
import { Button } from "@/components/ui/button";
import { moneyFormat } from "@/lib/money-format";
import { Tag, Transaction } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { EditTransactionButton } from "../_components/edit-transaction-button";
import { TypeBadge } from "../_components/type-badge";

export const columns: ColumnDef<Transaction & { tag?: Tag | null }>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row: { original } }) => <TypeBadge type={original.type} />,
  },
  {
    accessorKey: "tag",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row: { original } }) => original.tag?.name ?? "-",
    sortingFn: (rowA, rowB) => {
      const nameA = rowA.original.tag?.name?.toLowerCase() || "";
      const nameB = rowB.original.tag?.name?.toLowerCase() || "";
      return nameA.localeCompare(nameB);
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row: { original } }) =>
      new Date(original.date).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      }),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row: { original } }) => moneyFormat(original.amount / 100),
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row: { original } }) => (
      <div className="flex justify-end space-x-1">
        <EditTransactionButton transaction={original} />
        <DeleteButton
          action={deleteTransaction}
          id={original.id}
          name={original.name}
        />
      </div>
    ),
  },
];

"use client";

import { deleteTransaction } from "@/_actions/delete-transaction";
import { DeleteButton } from "@/_components/delete-button";
import { moneyFormat } from "@/_lib/money-format";
import { Tag, Transaction } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
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
        <DeleteButton
          action={deleteTransaction}
          id={original.id}
          name={original.name}
        />
      </div>
    ),
  },
];

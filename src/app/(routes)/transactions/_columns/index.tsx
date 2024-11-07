"use client";

import { Tag, Transaction } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { TypeBadge } from "../_components/type-badge";

export const columns: ColumnDef<Transaction & { tag?: Tag }>[] = [
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
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "actions",
    header: "",
  },
];

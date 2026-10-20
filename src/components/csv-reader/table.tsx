"use client";

import { TypeBadge } from "@/app/(app)/[board]/transactions/_components/type-badge";
import { formatCents } from "@/lib/money-format";
import { ColumnDef } from "@tanstack/react-table";
import { ParsedFile } from "./parse-data";

export const columns: ColumnDef<ParsedFile["data"][number]>[] = [
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
    cell: ({ row: { original } }) => formatCents(original.amount),
  },
];

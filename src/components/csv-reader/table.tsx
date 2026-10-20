"use client";

import { TypeBadge } from "@/app/(app)/[board]/transactions/_components/type-badge";
import { formatMonthYear } from "@/lib/date";
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
    cell: ({ row: { original } }) => formatMonthYear(original.date),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row: { original } }) => formatCents(original.amount),
  },
];

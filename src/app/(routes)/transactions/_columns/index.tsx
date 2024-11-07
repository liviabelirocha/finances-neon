"use client";

import { Button } from "@/_components/ui/button";
import { Tag, Transaction } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { PencilIcon, TrashIcon } from "lucide-react";
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
    cell: ({ row: { original } }) =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(original.amount / 100),
  },
  {
    accessorKey: "actions",
    header: "",
    cell: () => (
      <div className="space-x-1">
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <PencilIcon />
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <TrashIcon color="red" />
        </Button>
      </div>
    ),
  },
];

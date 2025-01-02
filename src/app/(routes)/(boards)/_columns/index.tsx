"use client";

import { Button } from "@/_components/ui/button";
import { Board, UserBoard } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { MoveRight, TrashIcon } from "lucide-react";
import Link from "next/link";

export const columns: ColumnDef<
  UserBoard & {
    board: Board;
  }
>[] = [
  {
    accessorKey: "board.name",
    header: "Name",
  },

  {
    accessorKey: "actions",
    header: "",
    cell: ({ row: { original } }) => (
      <div className="flex justify-end space-x-1">
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <TrashIcon color="red" />
        </Button>
        <Link href={`/${original.boardId}/transactions`}>
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <MoveRight />
          </Button>
        </Link>
      </div>
    ),
  },
];

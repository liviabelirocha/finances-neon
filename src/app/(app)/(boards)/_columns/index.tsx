"use client";

import { deleteBoard } from "@/actions/board/delete";
import { DeleteButton } from "@/components/delete-button";
import { Button } from "@/components/ui/button";
import { Board, UserBoard } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { MoveRight } from "lucide-react";
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
        <DeleteButton
          action={deleteBoard}
          id={original.boardId}
          name={original.board.name}
        />
        <Link href={`/${original.boardId}`}>
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <MoveRight />
          </Button>
        </Link>
      </div>
    ),
  },
];

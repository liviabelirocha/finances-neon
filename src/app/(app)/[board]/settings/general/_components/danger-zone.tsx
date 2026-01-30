"use client";

import { deleteBoard } from "@/actions/board/delete";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export const DangerZone = ({
  boardId,
  boardName,
}: {
  boardId: string;
  boardName: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [confirmName, setConfirmName] = useState("");
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

  const isConfirmDisabled = confirmName !== boardName;

  const handleDelete = () => {
    if (isConfirmDisabled) return;

    startTransition(async () => {
      try {
        await deleteBoard(boardId);
        router.push("/");
        toast({ title: "Board deleted successfully" });
      } catch {
        toast({
          title: "Failed to delete board",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <Card className="border-destructive/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg text-destructive">
          <AlertTriangle className="h-5 w-5" />
          Danger Zone
        </CardTitle>
        <CardDescription>Irreversible and destructive actions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium">Delete this board</p>
            <p className="text-sm text-muted-foreground">
              Once deleted, all data will be permanently removed.
            </p>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <Trash2 className="mr-1 h-4 w-4" />
                Delete Board
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete {boardName}?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete the
                  board and all associated transactions, tags, and data.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-2 py-4">
                <p className="text-sm text-muted-foreground">
                  Type <span className="font-semibold">{boardName}</span> to
                  confirm:
                </p>
                <Input
                  value={confirmName}
                  onChange={(e) => setConfirmName(e.target.value)}
                  placeholder="Board name"
                  disabled={isPending}
                />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    variant="ghost"
                    disabled={isPending}
                    onClick={() => setConfirmName("")}
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={isConfirmDisabled || isPending}
                >
                  Delete Board
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};

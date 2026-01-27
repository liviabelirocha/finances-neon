/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";
import { SheetDescription, SheetTitle } from "./ui/sheet";

export const DeleteButton = ({
  id,
  action,
  name,
  variant = "ghost",
}: {
  id: string;
  action: (id: string) => Promise<void>;
  name: string;
  variant?: "ghost" | "destructive";
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async () => {
    await action(id);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={variant} size="sm" className="text-muted-foreground">
          <TrashIcon color={variant === "ghost" ? "red" : "white"} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <SheetTitle>Are you sure you want to delete {name}?</SheetTitle>
          <SheetDescription>This action cannot be undone</SheetDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
          </DialogClose>
          <form action={handleSubmit}>
            <Button type="submit" variant="destructive">
              Delete
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

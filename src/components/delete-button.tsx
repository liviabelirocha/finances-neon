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
}: {
  id: string;
  action: (id: string) => Promise<void>;
  name: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async () => {
    await action(id);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <TrashIcon color="red" />
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

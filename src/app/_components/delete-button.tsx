/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/_components/ui/button";
import { TrashIcon } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";
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
    <>
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground"
        onClick={() => setIsOpen(true)}
      >
        <TrashIcon color="red" />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <SheetTitle>Are you sure you want to delete {name}?</SheetTitle>
            <SheetDescription>This action cannot be undone</SheetDescription>
          </DialogHeader>

          <form action={handleSubmit} className="flex justify-end">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="destructive">
              Delete
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Ellipsis } from "lucide-react";
import { PropsWithChildren, useState } from "react";

export const MoreFeatures = ({ children }: PropsWithChildren) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        className="rounded-full font-bold"
        onClick={() => setIsSheetOpen(true)}
      >
        <Ellipsis />
      </Button>

      <Sheet onOpenChange={(open) => setIsSheetOpen(open)} open={isSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>More features</SheetTitle>
          </SheetHeader>

          {children}
        </SheetContent>
      </Sheet>
    </>
  );
};

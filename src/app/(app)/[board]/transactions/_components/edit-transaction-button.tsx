"use client";

import { Button } from "@/components/ui/button";
import { UpsertTransactionForm } from "@/components/upsert-transaction-form";
import { Transaction } from "@prisma/client";
import { PencilIcon } from "lucide-react";
import { useState } from "react";

export const EditTransactionButton = ({
  transaction,
}: {
  transaction: Transaction;
}) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground"
        onClick={() => setIsSheetOpen(true)}
      >
        <PencilIcon />
      </Button>

      <UpsertTransactionForm
        isOpen={isSheetOpen}
        setIsOpen={setIsSheetOpen}
        defaultValues={{
          id: transaction.id,
          amount: transaction.amount / 100,
          date: transaction.date,
          name: transaction.name,
          type: transaction.type,
          tagId: transaction.tagId ?? undefined,
          method: transaction.method,
        }}
      />
    </>
  );
};

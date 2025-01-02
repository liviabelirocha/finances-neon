"use client";

import { ArrowDownUpIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { UpsertTransactionForm } from "../upsert-transaction-form";

export const AddTransactionButton = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <>
      <Button
        className="rounded-full font-bold"
        onClick={() => setIsSheetOpen(true)}
      >
        Add transaction
        <ArrowDownUpIcon />
      </Button>

      <UpsertTransactionForm isOpen={isSheetOpen} setIsOpen={setIsSheetOpen} />
    </>
  );
};

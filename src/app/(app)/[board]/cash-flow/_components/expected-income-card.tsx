"use client";

import { Button } from "@/components/ui/button";
import { moneyFormat } from "@/lib/money-format";
import { cn } from "@/lib/utils";
import { CalendarClockIcon, Pencil } from "lucide-react";
import { useState } from "react";
import { SummaryCard } from "../../(dashboard)/_components/summary-card";
import { ExpectedIncomeForm } from "./expected-income-form";

export const ExpectedIncomeCard = ({
  boardId,
  month,
  year,
  expectedIncome,
  receivedIncome,
  remaining,
}: {
  boardId: string;
  month: number;
  year: number;
  expectedIncome: number;
  receivedIncome: number;
  remaining: number;
}) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <SummaryCard
      icon={<CalendarClockIcon size={16} />}
      title={
        <div className="flex flex-1 items-center justify-between">
          <span>Expected income</span>
          {!isEditing && (
            <Button
              size="icon"
              variant="ghost"
              className="h-6 w-6"
              onClick={() => setIsEditing(true)}
            >
              <Pencil className="h-3 w-3" />
            </Button>
          )}
        </div>
      }
    >
      {isEditing ? (
        <ExpectedIncomeForm
          boardId={boardId}
          month={month}
          year={year}
          defaultAmount={expectedIncome}
          onSaved={() => setIsEditing(false)}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
          <p className="text-xl font-bold sm:text-2xl">
            {moneyFormat(expectedIncome / 100)}
          </p>
          <p className="text-sm text-muted-foreground">
            {moneyFormat(receivedIncome / 100)} received so far
          </p>
          <p
            className={cn(
              "text-sm text-muted-foreground",
              remaining < 0 && "text-red-500",
            )}
          >
            {moneyFormat(remaining / 100)} left this month
          </p>
        </>
      )}
    </SummaryCard>
  );
};

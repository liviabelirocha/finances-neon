import { currentMonth } from "@/actions/cash-flow/build-daily";
import { getDailyBudget } from "@/actions/cash-flow/get-daily";
import { MonthSelector } from "@/components/month-selector";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatCents } from "@/lib/money-format";
import { format } from "date-fns";
import { PiggyBankIcon, WalletIcon } from "lucide-react";
import Link from "next/link";
import { SummaryCard } from "../(dashboard)/_components/summary-card";
import { CashFlowChart } from "./_components/cash-flow-chart";
import { CashFlowTable } from "./_components/cash-flow-table";
import { ExpectedIncomeCard } from "./_components/expected-income-card";
import { ExpectedIncomeForm } from "./_components/expected-income-form";
import { STATUS_COLOR } from "./_components/status";

export default async function CashFlowPage({
  params,
  searchParams,
}: {
  params: Promise<{ board: string }>;
  searchParams: { month?: string; year?: string };
}) {
  const boardId = (await params).board;
  // Same timezone as the budget's "today", not the server's clock.
  const current = currentMonth();

  const pageParams = {
    boardId,
    month: Number(searchParams.month ?? current.month),
    year: Number(searchParams.year ?? current.year),
  };

  const budget = await getDailyBudget(pageParams);

  const todayBudget =
    budget.status === "ok"
      ? budget.days.find((day) => day.date === budget.today)
      : undefined;

  return (
    <ScrollArea>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-xl font-bold sm:text-2xl">Daily budget</h1>
          {budget.status !== "disabled" && (
            <div className="flex flex-wrap items-center gap-2">
              <MonthSelector {...pageParams} />
            </div>
          )}
        </div>

        {budget.status === "disabled" && (
          <div className="flex flex-col items-center gap-4 rounded-md border p-10 text-center">
            <p className="text-muted-foreground">
              Connect your AUVP API key to see how much you can spend each day.
            </p>
            <Button asChild>
              <Link href={`/${boardId}/settings/integrations`}>
                Set up integrations
              </Link>
            </Button>
          </div>
        )}

        {budget.status === "future" && (
          <p className="rounded-md border p-10 text-center text-muted-foreground">
            The daily budget is available for the current month and past months.
          </p>
        )}

        {budget.status === "missing-income" && (
          <Card className="mx-auto w-full max-w-lg">
            <CardHeader>
              <CardTitle className="text-lg">
                How much do you expect to earn in{" "}
                {format(new Date(pageParams.year, pageParams.month), "MMMM")}?
              </CardTitle>
              <CardDescription>
                The daily budget splits this amount across the month, so it
                doesn&apos;t jump every time a paycheck comes in.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ExpectedIncomeForm
                // Remount per month so the suggestion isn't stale.
                key={`${pageParams.year}-${pageParams.month}-${budget.suggestion}`}
                {...pageParams}
                defaultAmount={budget.suggestion}
                submitLabel="Start month"
              />
            </CardContent>
          </Card>
        )}

        {budget.status === "ok" && (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
              <SummaryCard
                icon={<WalletIcon size={16} />}
                title={todayBudget ? "Available today" : "Left this month"}
                className="bg-white bg-opacity-5"
              >
                <p className="text-xl font-bold sm:text-2xl">
                  {formatCents(
                    todayBudget
                      ? todayBudget.available - todayBudget.spent
                      : budget.remaining,
                  )}
                </p>
                {todayBudget && (
                  <p className="text-sm text-muted-foreground">
                    of {formatCents(todayBudget.available)} for the day
                  </p>
                )}
              </SummaryCard>
              <SummaryCard
                icon={<PiggyBankIcon size={16} />}
                title="Saved vs. even pace"
              >
                <p
                  className="text-xl font-bold sm:text-2xl"
                  style={{
                    color:
                      STATUS_COLOR[budget.savedVsPace >= 0 ? "good" : "bad"],
                  }}
                >
                  {formatCents(budget.savedVsPace)}
                </p>
                <p className="text-sm text-muted-foreground">
                  spent {formatCents(budget.spent)} so far
                </p>
              </SummaryCard>
              <ExpectedIncomeCard
                key={`${pageParams.year}-${pageParams.month}`}
                {...pageParams}
                expectedIncome={budget.expectedIncome}
                receivedIncome={budget.receivedIncome}
                remaining={budget.remaining}
              />
            </div>

            <CashFlowChart days={budget.days} />
            <CashFlowTable days={budget.days} today={budget.today} />
          </>
        )}
      </div>
    </ScrollArea>
  );
}

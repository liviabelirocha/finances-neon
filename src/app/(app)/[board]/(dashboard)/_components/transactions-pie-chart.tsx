"use client";

import { Dashboard } from "@/actions/transactions/types";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TransactionType } from "@prisma/client";
import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { Pie, PieChart } from "recharts";
import { PercentageItem } from "./percentage-item";

const chartConfig = {
  [TransactionType.INVESTMENT]: {
    label: "Invested",
    color: "#FFFFFF",
  },
  [TransactionType.INCOME]: {
    label: "Income",
    color: "#55B02E",
  },
  [TransactionType.EXPENSE]: {
    label: "Expenses",
    color: "#E93030",
  },
} satisfies ChartConfig;

export const TransactionsPieChart = ({
  summary: { EXPENSE, INCOME, INVESTMENT },
}: {
  summary: Dashboard["summary"];
}) => {
  const chartData = [
    {
      type: TransactionType.INCOME,
      amount: INCOME.total / 100,
      fill: "#55B02E",
    },
    {
      type: TransactionType.EXPENSE,
      amount: EXPENSE.total / 100,
      fill: "#E93030",
    },
    {
      type: TransactionType.INVESTMENT,
      amount: INVESTMENT.total / 100,
      fill: "#FFFFFF",
    },
  ];
  return (
    <Card className="flex flex-col p-4 md:p-6">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[180px] sm:max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="type"
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>

        <div className="space-y-3">
          <PercentageItem
            icon={<TrendingUpIcon size={16} className="text-primary" />}
            title="Income"
            value={INCOME.percentage}
          />
          <PercentageItem
            icon={<TrendingDownIcon size={16} className="text-red-500" />}
            title="Expenses"
            value={EXPENSE.percentage}
          />
          <PercentageItem
            icon={<PiggyBankIcon size={16} />}
            title="Invested"
            value={INVESTMENT.percentage}
          />
        </div>
      </CardContent>
    </Card>
  );
};

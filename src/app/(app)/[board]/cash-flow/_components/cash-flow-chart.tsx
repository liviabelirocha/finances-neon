"use client";

import { BudgetDay } from "@/actions/cash-flow/build-daily";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { moneyFormat } from "@/lib/money-format";
import {
  Bar,
  CartesianGrid,
  Cell,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
} from "recharts";
import { STATUS_COLOR } from "./status";

const chartConfig = {
  spent: { label: "Spent", color: "#A1A1AA" },
  available: { label: "Available", color: "#FFFFFF" },
} satisfies ChartConfig;

export const CashFlowChart = ({ days }: { days: BudgetDay[] }) => {
  const chartData = days.map((day) => ({
    day: day.date.slice(8),
    spent: day.projected ? null : day.spent / 100,
    available: day.available / 100,
    status: day.status,
  }));

  return (
    <Card>
      <CardHeader className="p-4 md:p-6">
        <CardTitle className="text-base">Spent vs. available per day</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 md:p-6 md:pt-0">
        <ChartContainer config={chartConfig} className="h-[260px] w-full">
          <ComposedChart data={chartData} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="day" tickLine={false} axisLine={false} />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={80}
              tickFormatter={(value: number) => moneyFormat(value)}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelFormatter={(label) => `Day ${label}`}
                  formatter={(value, name) => (
                    <div className="flex w-full justify-between gap-4">
                      <span className="text-muted-foreground">
                        {chartConfig[name as keyof typeof chartConfig].label}
                      </span>
                      <span className="font-mono font-medium">
                        {moneyFormat(Number(value))}
                      </span>
                    </div>
                  )}
                />
              }
            />
            <Bar dataKey="spent" radius={[4, 4, 0, 0]}>
              {chartData.map((entry) => (
                <Cell
                  key={entry.day}
                  fill={
                    entry.status
                      ? STATUS_COLOR[entry.status]
                      : "var(--color-spent)"
                  }
                />
              ))}
            </Bar>
            <Line
              dataKey="available"
              type="stepAfter"
              stroke="var(--color-available)"
              strokeWidth={2}
              strokeDasharray="4 4"
              dot={false}
            />
          </ComposedChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

"use client";

import { MonthSelector } from "@/components/month-selector";
import { QueryProvider } from "@/contexts/query-context";
import { useSearchParams } from "next/navigation";

export const MonthPicker = () => {
  const searchParams = useSearchParams();

  const month = +(searchParams.get("month") ?? new Date().getMonth());
  const year = +(searchParams.get("year") ?? new Date().getFullYear());

  return (
    <QueryProvider defaultParams={Object.fromEntries(searchParams.entries())}>
      <MonthSelector month={month} year={year} />
    </QueryProvider>
  );
};

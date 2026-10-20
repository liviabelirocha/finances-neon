"use client";

import { MonthSelector } from "@/components/month-selector";
import { useSelectedMonth } from "@/hooks/use-selected-month";
import { SearchParamsQueryProvider } from "../../_components/search-params-query-provider";

export const MonthPicker = () => {
  const { month, year } = useSelectedMonth();

  return (
    <SearchParamsQueryProvider>
      <MonthSelector month={month} year={year} />
    </SearchParamsQueryProvider>
  );
};

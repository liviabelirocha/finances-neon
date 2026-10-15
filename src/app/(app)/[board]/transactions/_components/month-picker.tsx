"use client";

import { MonthSelector } from "@/components/month-selector";
import { useSearchParams } from "next/navigation";
import { SearchParamsQueryProvider } from "../../_components/search-params-query-provider";

export const MonthPicker = () => {
  const searchParams = useSearchParams();

  const month = +(searchParams.get("month") ?? new Date().getMonth());
  const year = +(searchParams.get("year") ?? new Date().getFullYear());

  return (
    <SearchParamsQueryProvider>
      <MonthSelector month={month} year={year} />
    </SearchParamsQueryProvider>
  );
};

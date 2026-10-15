"use client";

import { QueryProvider } from "@/contexts/query-context";
import { useSearchParams } from "next/navigation";
import React from "react";

/** QueryProvider seeded with the current URL search params. */
export const SearchParamsQueryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const searchParams = useSearchParams();

  return (
    <QueryProvider defaultParams={Object.fromEntries(searchParams.entries())}>
      {children}
    </QueryProvider>
  );
};

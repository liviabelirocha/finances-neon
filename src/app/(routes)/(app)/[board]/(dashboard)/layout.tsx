"use client";

import { QueryProvider } from "@/_contexts/query-context";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();

  return (
    <QueryProvider defaultParams={Object.fromEntries(searchParams.entries())}>
      {children}
    </QueryProvider>
  );
}

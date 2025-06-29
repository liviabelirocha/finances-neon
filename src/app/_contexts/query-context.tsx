/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { usePathname, useRouter } from "next/navigation";
import { PropsWithChildren, createContext, useContext } from "react";

type QueryContextData = {
  getParam: (param: string) => string | null;
  getPath: () => string;
  setParams: (args: { name: string; value: string | string[] }[]) => void;
};

export const QueryContext = createContext({} as QueryContextData);

export function QueryProvider({
  defaultParams,
  children,
}: {
  defaultParams?: Record<string, string>;
} & PropsWithChildren) {
  const pathname = usePathname();
  const router = useRouter();

  const params = new URLSearchParams(defaultParams);

  const setParams = (args: { name: string; value: string | string[] }[]) => {
    args.forEach(({ name, value }) => {
      params.set(name, typeof value === "string" ? value : value.join(","));
    });
    router.push(getPath());
  };

  const getPath = () => `${pathname}?${params.toString()}`;

  const getParam = (param: string) => params.get(param);

  return (
    <QueryContext.Provider
      value={{
        setParams,
        getParam,
        getPath,
      }}
    >
      {children}
    </QueryContext.Provider>
  );
}

export function useQuery() {
  const context = useContext(QueryContext);

  if (!context)
    throw new Error("useQuery must be used within an QueryProvider");

  return context;
}

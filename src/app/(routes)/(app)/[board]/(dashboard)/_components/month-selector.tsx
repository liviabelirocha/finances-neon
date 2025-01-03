"use client";

import { DatePicker } from "@/_components/ui/date-picker";
import { set } from "date-fns";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export const MonthSelector = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const month = searchParams.get("month") ?? new Date().getMonth();
  const year = searchParams.get("year") ?? new Date().getFullYear();

  const [date, setDate] = useState(
    set(new Date(), { month: +month, year: +year }),
  );

  return (
    <div className="w-fit">
      <DatePicker
        onChange={(newDate) => {
          setDate(newDate);
          router.push(
            `${pathname}?month=${newDate.getMonth()}&year=${newDate.getFullYear()}`,
          );
        }}
        value={date}
      />
    </div>
  );
};

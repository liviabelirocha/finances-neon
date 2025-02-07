"use client";

import { DatePicker } from "@/_components/ui/date-picker";
import { set } from "date-fns";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export const MonthSelector = ({
  month,
  year,
}: {
  month: number;
  year: number;
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const [date, setDate] = useState(set(new Date(), { month, year }));

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

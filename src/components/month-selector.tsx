"use client";

import { DatePicker } from "@/components/ui/date-picker";
import { useQuery } from "@/contexts/query-context";
import { monthStart } from "@/lib/date";
import { useState } from "react";

export const MonthSelector = ({
  month,
  year,
}: {
  month: number;
  year: number;
}) => {
  const query = useQuery();

  const [date, setDate] = useState(monthStart({ month, year }));

  return (
    <div className="w-fit">
      <DatePicker
        onChange={(newDate) => {
          setDate(newDate);
          query.setParams([
            { name: "month", value: newDate.getMonth().toString() },
            { name: "year", value: newDate.getFullYear().toString() },
          ]);
        }}
        value={date}
      />
    </div>
  );
};

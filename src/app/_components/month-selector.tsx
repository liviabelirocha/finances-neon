"use client";

import { DatePicker } from "@/_components/ui/date-picker";
import { useQuery } from "@/_contexts/query-context";
import { set } from "date-fns";
import { useState } from "react";

export const MonthSelector = ({
  month,
  year,
}: {
  month: number;
  year: number;
}) => {
  const query = useQuery();

  const [date, setDate] = useState(set(new Date(), { month, year }));

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

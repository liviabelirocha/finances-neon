"use client";

import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "./button";
import { MonthPicker } from "./month-picker";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export const DatePicker = ({
  value,
  onChange,
}: {
  value: Date;
  onChange: (newMonth: Date) => void;
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? (
            new Date(value).toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })
          ) : (
            <span>Pick a date...</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <MonthPicker value={value} onChange={onChange} />
      </PopoverContent>
    </Popover>
  );
};

"use client";

import { BudgetDay } from "@/actions/cash-flow/build-daily";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCents } from "@/lib/money-format";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Fragment, useState } from "react";
import { STATUS_COLOR, STATUS_LABEL } from "./status";

const Amount = ({ cents }: { cents: number }) =>
  cents === 0 ? (
    <span className="text-muted-foreground">—</span>
  ) : (
    <span className={cents > 0 ? "text-green-500" : "text-red-500"}>
      {formatCents(cents)}
    </span>
  );

export const CashFlowTable = ({
  days,
  today,
}: {
  days: BudgetDay[];
  today: string;
}) => {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Day</TableHead>
            <TableHead className="text-right">Available</TableHead>
            <TableHead className="text-right">Spent</TableHead>
            <TableHead className="text-right">Saved</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {days.map((day) => {
            const isOpen = expanded === day.date;
            const hasItems = day.items.length > 0;

            return (
              <Fragment key={day.date}>
                <TableRow
                  className={cn(
                    hasItems && "cursor-pointer",
                    day.projected && "text-muted-foreground",
                    day.date === today && "bg-accent/50 font-semibold",
                  )}
                  onClick={() =>
                    hasItems && setExpanded(isOpen ? null : day.date)
                  }
                >
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {hasItems ? (
                        isOpen ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )
                      ) : (
                        <span className="w-4" />
                      )}
                      <span
                        className="h-2.5 w-2.5 shrink-0 rounded-full"
                        style={{
                          backgroundColor: day.status
                            ? STATUS_COLOR[day.status]
                            : "transparent",
                        }}
                        title={
                          day.status ? STATUS_LABEL[day.status] : undefined
                        }
                      />
                      {day.date.slice(8)}/{day.date.slice(5, 7)}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCents(day.available)}
                  </TableCell>
                  <TableCell className="text-right">
                    {day.projected ? "—" : formatCents(day.spent)}
                  </TableCell>
                  <TableCell
                    className="text-right font-medium"
                    style={{
                      color: day.status ? STATUS_COLOR[day.status] : undefined,
                    }}
                  >
                    {day.projected ? "—" : formatCents(day.saved)}
                  </TableCell>
                </TableRow>
                {isOpen &&
                  day.items.map((item, index) => (
                    <TableRow
                      key={`${day.date}-${index}`}
                      className={cn(
                        "bg-white bg-opacity-5 text-sm",
                        item.kind === "ignored" && "opacity-50",
                      )}
                    >
                      <TableCell colSpan={3} className="pl-10">
                        {item.description}
                        {item.kind !== "spending" && (
                          <Badge variant="outline" className="ml-2">
                            {item.kind}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Amount cents={item.amount} />
                      </TableCell>
                    </TableRow>
                  ))}
              </Fragment>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

"use client";

import { Dashboard } from "@/actions/transactions/types";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TRANSACTION_METHOD_OPTIONS_ICONS } from "@/constants/transactions";
import { moneyFormat } from "@/lib/money-format";
import { TransactionType } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

export const LastTransactions = ({
  lastTransactions,
}: {
  lastTransactions: Dashboard["lastTransactions"];
}) => {
  const getPriceColor = (type: TransactionType) => {
    switch (type) {
      case TransactionType.INCOME:
        return "text-primary";
      case TransactionType.EXPENSE:
        return "text-red-500";
      default:
        return "text-white";
    }
  };

  const getPrefix = (type: TransactionType) => {
    switch (type) {
      case TransactionType.INCOME:
        return "+";
      case TransactionType.EXPENSE:
        return "-";
      default:
        return "";
    }
  };

  const params = useParams();

  return (
    <ScrollArea className="rounded-md border">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="font-bold">Last Transactions</CardTitle>
        <Button variant="outline" className="rounded-full font-bold">
          <Link href={`/${params.board}/transactions`}>See more</Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {lastTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-white bg-opacity-[3%] p-3">
                <Image
                  src={TRANSACTION_METHOD_OPTIONS_ICONS[transaction.method]}
                  height={20}
                  width={20}
                  alt={TRANSACTION_METHOD_OPTIONS_ICONS[transaction.method]}
                />
              </div>
              <div>
                <div className="text-sm font-bold">{transaction.name}</div>
                <div className="text-sm text-muted-foreground">
                  {new Date(transaction.date).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </div>
              </div>
            </div>

            <p
              className={`text-sm font-bold ${getPriceColor(transaction.type)}`}
            >
              {getPrefix(transaction.type)}
              {moneyFormat(transaction.amount / 100)}
            </p>
          </div>
        ))}
      </CardContent>
    </ScrollArea>
  );
};

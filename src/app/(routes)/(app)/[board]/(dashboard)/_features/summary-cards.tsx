import { getTransactionsSummaryByType } from "@/_actions/transactions/summary-by-type";
import { AddTransactionButton } from "@/_components/add-transaction-button";
import { moneyFormat } from "@/_lib/money-format";
import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import { SummaryCard } from "../_components/summary-card";

export const SummaryCards = async ({
  summary,
}: {
  summary: Awaited<ReturnType<typeof getTransactionsSummaryByType>>;
}) => {
  return (
    <div className="space-y-6">
      <SummaryCard icon={<WalletIcon size={16} />} title={"Balance"}>
        <div className="flex justify-between">
          <p className="text-4xl font-bold">
            {moneyFormat(
              (summary.INCOME - summary.INVESTMENT - summary.EXPENSE) / 100,
            )}
          </p>
          <AddTransactionButton />
        </div>
      </SummaryCard>

      <div className="grid grid-cols-3 gap-6">
        <SummaryCard icon={<PiggyBankIcon size={16} />} title="Invested">
          <p className="text-2xl font-bold">
            {moneyFormat(summary.INVESTMENT / 100)}
          </p>
        </SummaryCard>
        <SummaryCard
          icon={<TrendingUpIcon size={16} className="text-green-500" />}
          title="Revenue"
        >
          <p className="text-2xl font-bold">
            {moneyFormat(summary.INCOME / 100)}
          </p>
        </SummaryCard>
        <SummaryCard
          icon={<TrendingDownIcon size={16} className="text-red-500" />}
          title="Expenses"
        >
          <p className="text-2xl font-bold">
            {moneyFormat(summary.EXPENSE / 100)}
          </p>
        </SummaryCard>
      </div>
    </div>
  );
};

import { Dashboard } from "@/actions/transactions/types";
import { AddTransactionButton } from "@/components/add-transaction-button";
import { moneyFormat } from "@/lib/money-format";
import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import { SummaryCard } from "../_components/summary-card";

export const SummaryCards = ({
  summary: { EXPENSE, INCOME, INVESTMENT },
}: {
  summary: Dashboard["summary"];
}) => {
  return (
    <div className="space-y-6">
      <SummaryCard
        icon={<WalletIcon size={16} />}
        title={"Balance"}
        className="bg-white bg-opacity-5"
      >
        <div className="flex justify-between">
          <p className="text-4xl font-bold">
            {moneyFormat(
              (INCOME.total - INVESTMENT.total - EXPENSE.total) / 100,
            )}
          </p>
          <AddTransactionButton />
        </div>
      </SummaryCard>

      <div className="grid grid-cols-3 gap-6">
        <SummaryCard
          icon={<PiggyBankIcon size={16} />}
          title="Invested"
          className="bg-white bg-opacity-5"
        >
          <p className="text-2xl font-bold">
            {moneyFormat(INVESTMENT.total / 100)}
          </p>
        </SummaryCard>
        <SummaryCard
          icon={<TrendingUpIcon size={16} className="text-green-500" />}
          title="Income"
        >
          <p className="text-2xl font-bold">
            {moneyFormat(INCOME.total / 100)}
          </p>
        </SummaryCard>
        <SummaryCard
          icon={<TrendingDownIcon size={16} className="text-red-500" />}
          title="Expenses"
        >
          <p className="text-2xl font-bold">
            {moneyFormat(EXPENSE.total / 100)}
          </p>
        </SummaryCard>
      </div>
    </div>
  );
};

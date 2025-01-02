import { TransactionType } from "@prisma/client";

export const TRANSACTION_TYPE_OPTIONS = [
  {
    value: TransactionType.EXPENSE,
    label: "Expense",
  },
  {
    value: TransactionType.INCOME,
    label: "Income",
  },
  {
    value: TransactionType.INVESTMENT,
    label: "Investment",
  },
  {
    value: TransactionType.INVESTMENT_WITHDRAWAL,
    label: "Investment Withdrawal",
  },
];

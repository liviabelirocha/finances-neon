import { TransactionMethod, TransactionType } from "@prisma/client";

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

export const TRANSACTION_METHOD_OPTIONS = [
  {
    value: TransactionMethod.PIX,
    label: "Pix",
    icon: "/svg/methods/pix.svg",
  },
  {
    value: TransactionMethod.CASH,
    label: "Cash",
    icon: "/svg/methods/cash.svg",
  },
  {
    value: TransactionMethod.CARD,
    label: "Card",
    icon: "/svg/methods/card.svg",
  },
  {
    value: TransactionMethod.OTHER,
    label: "Other",
    icon: "/svg/methods/other.svg",
  },
];

export const TRANSACTION_METHOD_OPTIONS_ICONS = {
  [TransactionMethod.PIX]: "/svg/methods/pix.svg",
  [TransactionMethod.CASH]: "/svg/methods/cash.svg",
  [TransactionMethod.CARD]: "/svg/methods/card.svg",
  [TransactionMethod.OTHER]: "/svg/methods/other.svg",
};

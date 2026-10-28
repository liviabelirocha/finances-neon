import { formatDayKey, monthStart, toDayKey } from "@/lib/date";
import { addDays, endOfMonth, getDaysInMonth } from "date-fns";
import { toCents } from "@/lib/money-format";
import type { AuvpAccount, AuvpTransaction } from "@/lib/auvp";

const WARNING_RATIO = 0.8;

export type DayStatus = "good" | "warning" | "bad";

export type BudgetItemKind = "income" | "spending" | "savings" | "ignored";

export type IgnoreRules = { budgetIds: number[]; tagIds: number[] };

type BudgetItem = {
  description: string;
  amount: number;
  kind: BudgetItemKind;
};

export type BudgetDay = {
  date: string;
  /** What could be spent this day: what is left of the expected income ÷ remaining days. */
  available: number;
  spent: number;
  /** available − spent; negative when the day went over. */
  saved: number;
  status: DayStatus | null;
  projected: boolean;
  items: BudgetItem[];
};

export type DailyBudget = {
  days: BudgetDay[];
  today: string;
  /** Income registered as expected for the month: the month's budget. */
  expectedIncome: number;
  /** Income actually received so far, for comparison only. */
  receivedIncome: number;
  spent: number;
  /** Spent less (positive) or more (negative) than an even pace so far. */
  savedVsPace: number;
  /** What is still left of the expected income for the rest of the month. */
  remaining: number;
  /** What should have been saved so far: received income − spent. */
  savingsTarget: number;
  /** What was actually moved to savings so far, net of withdrawals. */
  savingsActual: number;
};

const dayStatus = (spent: number, available: number): DayStatus => {
  if (spent <= 0) return "good";
  if (available <= 0 || spent > available) return "bad";

  return spent >= available * WARNING_RATIO ? "warning" : "good";
};

export const buildDailyBudget = ({
  accounts,
  transactions,
  expectedIncome,
  ignoreRules,
  year,
  month,
  now = new Date(),
}: {
  accounts: AuvpAccount[];
  /** Every transaction of the month (any account) up to today. */
  transactions: AuvpTransaction[];
  /** In cents. Weekly paychecks would make the budget jump if it followed
   * what was actually received, so it is fixed upfront for the month. */
  expectedIncome: number;
  /** Budgets ("metas") hold savings, like investments; tags are left out
   * entirely, like reimbursements. */
  ignoreRules: IgnoreRules;
  year: number;
  month: number;
  now?: Date;
}): DailyBudget => {
  const today = toDayKey(now);
  const firstDay = monthStart({ month, year });
  const lastDay = getDaysInMonth(firstDay);
  const from = formatDayKey(firstDay);
  const to = formatDayKey(endOfMonth(firstDay));

  const bankIds = new Set(
    accounts
      .filter((account) => account.type === "BANK")
      .map((account) => account.id),
  );

  // Transactions are fetched with a day of margin on each side, so the
  // month is cut here in the budget's timezone. Bill payments and transfers
  // between own accounts would count card purchases twice, and ignored
  // transactions were excluded by the user.
  const monthTransactions = transactions.filter((transaction) => {
    const date = toDayKey(transaction.date);

    return (
      date >= from &&
      date <= to &&
      date <= today &&
      !transaction.is_internal_transfer &&
      !transaction.ignore
    );
  });

  const ignoredBudgetIds = new Set(ignoreRules.budgetIds);
  const ignoredTagIds = new Set(ignoreRules.tagIds);

  // Savings and ignored transactions stay in the day's items so they remain
  // visible, but count as neither spending nor income. An ignored tag wins
  // over a savings budget, since it means "leave this out entirely".
  const kindOf = (transaction: AuvpTransaction): BudgetItemKind => {
    if (transaction.tagIds.some((tagId) => ignoredTagIds.has(tagId)))
      return "ignored";

    if (
      transaction.budgetId !== null &&
      ignoredBudgetIds.has(transaction.budgetId)
    )
      return "savings";

    return bankIds.has(transaction.accountId) && transaction.amount > 0
      ? "income"
      : "spending";
  };

  const classified = monthTransactions.map((transaction) => ({
    date: toDayKey(transaction.date),
    item: {
      description: transaction.description,
      amount: toCents(transaction.amount),
      kind: kindOf(transaction),
    } satisfies BudgetItem,
  }));

  const sumOf = (items: BudgetItem[], kind: BudgetItemKind) =>
    items
      .filter((item) => item.kind === kind)
      .reduce((sum, item) => sum + item.amount, 0);

  const allItems = classified.map(({ item }) => item);
  const receivedIncome = sumOf(allItems, "income");
  // Deposits are negative and withdrawals positive.
  const savingsActual = -sumOf(allItems, "savings");

  let spentBefore = 0;
  // Future days share what is left evenly instead of each one assuming
  // nothing will be spent on the days before it.
  let projectedAvailable: number | null = null;

  const days = Array.from({ length: lastDay }, (_, index) => {
    const date = formatDayKey(addDays(firstDay, index));
    const items = classified
      .filter((entry) => entry.date === date)
      .map(({ item }) => item);

    const projected = date > today;
    const evenShare = Math.round(
      (expectedIncome - spentBefore) / (lastDay - index),
    );

    if (projected) projectedAvailable ??= evenShare;

    const available = projected ? (projectedAvailable as number) : evenShare;
    const spent = projected ? 0 : -sumOf(items, "spending");

    spentBefore += spent;

    return {
      date,
      available,
      spent,
      saved: available - spent,
      status: projected ? null : dayStatus(spent, available),
      projected,
      items,
    };
  });

  const elapsedDays = days.filter((day) => !day.projected).length;

  return {
    days,
    today,
    expectedIncome,
    receivedIncome,
    spent: spentBefore,
    savedVsPace:
      Math.round((expectedIncome * elapsedDays) / lastDay) - spentBefore,
    remaining: expectedIncome - spentBefore,
    savingsTarget: receivedIncome - spentBefore,
    savingsActual,
  };
};

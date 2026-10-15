import type { AuvpAccount, AuvpTransaction } from "@/lib/auvp";

const TIMEZONE = "America/Sao_Paulo";
const WARNING_RATIO = 0.8;

export type DayStatus = "good" | "warning" | "bad";

type BudgetItemKind = "income" | "spending";

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
};

const toCents = (value: number | string) => Math.round(Number(value) * 100);

export const toDayKey = (date: Date | string) =>
  new Date(date).toLocaleDateString("en-CA", { timeZone: TIMEZONE });

/** YYYY-MM-DD for a day of the month (0-11), clamped to the month length. */
export const dayKey = (year: number, month: number, day: number) => {
  const lastDay = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();

  return [
    year,
    String(month + 1).padStart(2, "0"),
    String(Math.min(day, lastDay)).padStart(2, "0"),
  ].join("-");
};

/** Moves a YYYY-MM-DD key by a number of days. */
export const shiftDayKey = (key: string, days: number) => {
  const [year, month, day] = key.split("-").map(Number);

  return new Date(Date.UTC(year, month - 1, day + days))
    .toISOString()
    .slice(0, 10);
};

/** Current month (0-11) and year in the budget's timezone. */
export const currentMonth = (now = new Date()) => {
  const today = toDayKey(now);

  return {
    year: Number(today.slice(0, 4)),
    month: Number(today.slice(5, 7)) - 1,
  };
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
  year: number;
  month: number;
  now?: Date;
}): DailyBudget => {
  const today = toDayKey(now);
  const monthStart = dayKey(year, month, 1);
  const monthEnd = dayKey(year, month, 31);
  const lastDay = Number(monthEnd.slice(8));

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
      date >= monthStart &&
      date <= monthEnd &&
      date <= today &&
      !transaction.is_internal_transfer &&
      !transaction.ignore
    );
  });

  const classified = monthTransactions.map((transaction) => ({
    date: toDayKey(transaction.date),
    item: {
      description: transaction.description,
      amount: toCents(transaction.amount),
      kind:
        bankIds.has(transaction.accountId) && transaction.amount > 0
          ? "income"
          : "spending",
    } satisfies BudgetItem,
  }));

  const sumOf = (items: BudgetItem[], kind: BudgetItemKind) =>
    items
      .filter((item) => item.kind === kind)
      .reduce((sum, item) => sum + item.amount, 0);

  const receivedIncome = sumOf(
    classified.map(({ item }) => item),
    "income",
  );

  let spentBefore = 0;
  // Future days share what is left evenly instead of each one assuming
  // nothing will be spent on the days before it.
  let projectedAvailable: number | null = null;

  const days = Array.from({ length: lastDay }, (_, index) => {
    const date = dayKey(year, month, index + 1);
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
  };
};

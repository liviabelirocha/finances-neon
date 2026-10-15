"use server";

import { listAccounts, listTransactions } from "@/lib/auvp";
import { assertBoardMember } from "@/lib/board-member";
import { getAuvpApiKey } from "@/lib/integrations";
import { db } from "@/lib/prisma";
import {
  DailyBudget,
  buildDailyBudget,
  dayKey,
  shiftDayKey,
  toDayKey,
} from "./build-daily";

type DailyBudgetResult =
  | { status: "disabled" }
  | { status: "future" }
  /** The month has no expected income yet; `suggestion` is the latest one. */
  | { status: "missing-income"; suggestion: number | null }
  | ({ status: "ok" } & DailyBudget);

export const getDailyBudget = async ({
  boardId,
  month,
  year,
}: {
  boardId: string;
  month: number;
  year: number;
}): Promise<DailyBudgetResult> => {
  await assertBoardMember(boardId);

  const auvpApiKey = await getAuvpApiKey(boardId);

  if (!auvpApiKey) return { status: "disabled" };

  const today = toDayKey(new Date());
  const from = dayKey(year, month, 1);
  const to = dayKey(year, month, 31);

  if (from > today) return { status: "future" };

  const expectedIncome = await db.expectedIncome.findUnique({
    where: { boardId_year_month: { boardId, year, month } },
  });

  if (!expectedIncome) {
    const latest = await db.expectedIncome.findFirst({
      where: { boardId },
      orderBy: [{ year: "desc" }, { month: "desc" }],
    });

    return { status: "missing-income", suggestion: latest?.amount ?? null };
  }

  // AUVP may read bare dates as UTC, which is up to a day off from
  // America/Sao_Paulo; the extra day on each side is trimmed by
  // buildDailyBudget.
  const [accounts, transactions] = await Promise.all([
    listAccounts(auvpApiKey),
    listTransactions(auvpApiKey, {
      from: shiftDayKey(from, -1),
      to: shiftDayKey(to < today ? to : today, 1),
    }),
  ]);

  return {
    status: "ok",
    ...buildDailyBudget({
      accounts,
      transactions,
      expectedIncome: expectedIncome.amount,
      year,
      month,
    }),
  };
};

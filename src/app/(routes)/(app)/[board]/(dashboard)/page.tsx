import { getTransactionsSummaryByType } from "@/_actions/transactions/summary-by-type";
import { MonthSelector } from "./_components/month-selector";
import { SummaryCards } from "./_features/summary-cards";

export default async function Dashboard({
  params,
  searchParams,
}: {
  params: Promise<{ board: string }>;
  searchParams: { month?: number; year?: number };
}) {
  const boardId = (await params).board;

  const summary = await getTransactionsSummaryByType({
    boardId,
    month: searchParams.month ?? new Date().getMonth(),
    year: searchParams.year ?? new Date().getFullYear(),
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1>Dashboard</h1>
        <MonthSelector />
      </div>
      <SummaryCards summary={summary} />
    </div>
  );
}

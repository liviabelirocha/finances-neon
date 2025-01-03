import { getDashboard } from "@/_actions/transactions/get-dashboard";
import { MonthSelector } from "./_components/month-selector";
import { TransactionsPieChart } from "./_components/transactions-pie-chart";
import { SummaryCards } from "./_features/summary-cards";

export default async function Dashboard({
  params,
  searchParams,
}: {
  params: Promise<{ board: string }>;
  searchParams: { month?: number; year?: number };
}) {
  const boardId = (await params).board;

  const dashboard = await getDashboard({
    boardId,
    month: searchParams.month ?? new Date().getMonth(),
    year: searchParams.year ?? new Date().getFullYear(),
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <MonthSelector />
      </div>

      <div className="grid h-full grid-cols-[2fr,1fr] gap-6 overflow-hidden">
        <div className="flex flex-col gap-6 overflow-hidden">
          <SummaryCards {...dashboard} />
          <div className="grid h-full grid-cols-3 grid-rows-1 gap-6 overflow-hidden">
            <TransactionsPieChart {...dashboard} />
          </div>
        </div>
      </div>
    </div>
  );
}

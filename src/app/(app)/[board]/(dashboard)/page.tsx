import { getDashboard } from "@/actions/transactions/get-dashboard";
import { CsvReader } from "@/components/csv-reader";
import { MonthSelector } from "@/components/month-selector";
import { ExpensesPerCategory } from "./_components/expenses-per-category";
import { LastTransactions } from "./_components/last-transactions";
import { TransactionsPieChart } from "./_components/transactions-pie-chart";
import {
  VisualizationTabs,
  VisualizationType,
} from "./_components/visualization-tabs";
import { SummaryCards } from "./_features/summary-cards";

export default async function Dashboard({
  params,
  searchParams,
}: {
  params: Promise<{ board: string }>;
  searchParams: { month?: number; year?: number; visualization?: string };
}) {
  const boardId = (await params).board;

  const dashParams = {
    boardId,
    month: searchParams.month ?? new Date().getMonth(),
    year: searchParams.year ?? new Date().getFullYear(),
    visualization: (searchParams.visualization ??
      "monthly") as VisualizationType,
  };

  const dashboard = await getDashboard(dashParams);

  return (
    <div className="flex flex-col space-y-6 overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
        <div className="flex gap-2">
          <VisualizationTabs />
          <CsvReader />
          {/* <AiReportButton {...dashParams} /> */}
          <MonthSelector {...dashParams} />
        </div>
      </div>

      <div className="grid h-full grid-cols-[2fr,1fr] gap-6 overflow-hidden">
        <div className="flex flex-col gap-6 overflow-hidden">
          <SummaryCards {...dashboard} />
          <div className="grid h-full grid-cols-3 grid-rows-1 gap-6 overflow-hidden">
            <TransactionsPieChart {...dashboard} />
            <ExpensesPerCategory {...dashboard} />
          </div>
        </div>
        <LastTransactions {...dashboard} />
      </div>
    </div>
  );
}

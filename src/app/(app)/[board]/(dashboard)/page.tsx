import { getDashboard } from "@/actions/transactions/get-dashboard";
import { MonthSelector } from "@/components/month-selector";
import { ExpensesPerCategory } from "./_components/expenses-per-category";
import { LastTransactions } from "./_components/last-transactions";
import { TransactionsPieChart } from "./_components/transactions-pie-chart";
import {
  VisualizationTabs,
  VisualizationType,
} from "./_components/visualization-tabs";
import { DashFeatureList } from "./_features/feature-list";
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
    <div className="flex flex-col space-y-6 lg:overflow-hidden">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl font-bold sm:text-2xl">Dashboard</h1>
        <div className="flex flex-wrap items-center gap-2">
          <VisualizationTabs />
          {/* <AiReportButton {...dashParams} /> */}
          <MonthSelector {...dashParams} />
          <DashFeatureList />
        </div>
      </div>

      <div className="flex flex-col gap-6 overflow-auto lg:grid lg:h-full lg:grid-cols-[2fr,1fr] lg:overflow-hidden">
        <div className="flex flex-col gap-6 lg:overflow-hidden">
          <SummaryCards {...dashboard} />
          <div className="flex flex-col gap-6 md:grid md:h-full md:grid-cols-3 md:grid-rows-1 md:overflow-hidden">
            <TransactionsPieChart {...dashboard} />
            <ExpensesPerCategory {...dashboard} />
          </div>
        </div>
        <LastTransactions {...dashboard} />
      </div>
    </div>
  );
}

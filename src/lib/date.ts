import { addMonths, format, parseISO } from "date-fns";

const TIMEZONE = "America/Sao_Paulo";

type MonthParam = string | number | null | undefined;

const paramOr = (value: MonthParam, fallback: number) =>
  value == null || value === "" ? fallback : Number(value);

export const toDayKey = (date: Date | string) =>
  new Date(date).toLocaleDateString("en-CA", { timeZone: TIMEZONE });

export const formatDayKey = (date: Date) => format(date, "yyyy-MM-dd");

const currentMonth = () => {
  const today = parseISO(toDayKey(new Date()));

  return { month: today.getMonth(), year: today.getFullYear() };
};

export const selectedMonth = (params: {
  month?: MonthParam;
  year?: MonthParam;
}) => {
  const current = currentMonth();

  return {
    month: paramOr(params.month, current.month),
    year: paramOr(params.year, current.year),
  };
};

export const monthStart = ({ month, year }: { month: number; year: number }) =>
  new Date(year, month, 1);

export const dateRange = (start: Date, end?: Date) => ({
  gte: start,
  lt: end ?? addMonths(start, 1),
});

export const formatMonthYear = (date: Date) => format(date, "MMMM yyyy");

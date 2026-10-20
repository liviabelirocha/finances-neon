import { selectedMonth } from "@/lib/date";
import { useSearchParams } from "next/navigation";

export const useSelectedMonth = () => {
  const searchParams = useSearchParams();

  return selectedMonth({
    month: searchParams.get("month"),
    year: searchParams.get("year"),
  });
};

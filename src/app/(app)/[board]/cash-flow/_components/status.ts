import { DayStatus } from "@/actions/cash-flow/build-daily";

export const STATUS_COLOR: Record<DayStatus, string> = {
  good: "#55B02E",
  warning: "#EAB308",
  bad: "#E93030",
};

export const STATUS_LABEL: Record<DayStatus, string> = {
  good: "Under budget",
  warning: "Close to the limit",
  bad: "Over budget",
};

import { ReactNode } from "react";

export const PercentageItem = ({
  icon,
  title,
  value,
}: {
  icon: ReactNode;
  title: string;
  value: number;
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-white bg-opacity-[3%] p-2">{icon}</div>
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
      <p className="text-sm font-bold">{value}%</p>
    </div>
  );
};

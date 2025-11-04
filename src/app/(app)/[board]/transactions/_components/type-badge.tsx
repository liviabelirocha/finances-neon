import { Badge } from "@/components/ui/badge";
import { TransactionType } from "@prisma/client";
import { CircleIcon } from "lucide-react";

const getClassNames = (type: TransactionType) => {
  const typeClasses = {
    [TransactionType.INCOME]: {
      badge: "bg-green-700 text-green-700 hover:bg-green-700",
      icon: "fill-green-700",
    },
    [TransactionType.EXPENSE]: {
      badge: "bg-red-700 text-red-700 hover:bg-red-700",
      icon: "fill-red-700",
    },
    [TransactionType.INVESTMENT]: {
      badge: "bg-purple-700 text-purple-700 hover:bg-purple-700",
      icon: "fill-purple-700",
    },
    [TransactionType.INVESTMENT_WITHDRAWAL]: {
      badge: "bg-blue-700 text-blue-700 hover:bg-blue-700",
      icon: "fill-blue-700",
    },
  };

  return typeClasses[type];
};

const formatTypeText = (type: TransactionType) =>
  type
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export const TypeBadge = ({ type }: { type: TransactionType }) => {
  const { badge, icon } = getClassNames(type);

  return (
    <Badge className={`bg-opacity-10 font-bold ${badge}`}>
      <CircleIcon className={`mr-2 ${icon}`} size={10} />
      {formatTypeText(type)}
    </Badge>
  );
};

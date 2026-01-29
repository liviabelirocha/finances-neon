import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const SummaryCard = ({
  icon,
  title,
  className,
  children,
}: {
  icon: React.ReactNode;
  title: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <Card className={className}>
      <CardHeader className="flex-row items-center gap-2 p-4 md:gap-4 md:p-6">
        {icon}
        {title}
      </CardHeader>
      <CardContent className="p-4 pt-0 md:p-6 md:pt-0">{children}</CardContent>
    </Card>
  );
};

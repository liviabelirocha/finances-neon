import { Card, CardContent, CardHeader } from "@/_components/ui/card";

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
      <CardHeader className="flex-row items-center gap-4">
        {icon}
        {title}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

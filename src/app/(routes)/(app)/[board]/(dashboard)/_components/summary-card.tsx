import { Card, CardContent, CardHeader } from "@/_components/ui/card";

export const SummaryCard = ({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <Card>
      <CardHeader className="flex-row items-center gap-4">
        {icon}
        {title}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

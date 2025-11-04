import { Dashboard } from "@/actions/transactions/types";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { moneyFormat } from "@/lib/money-format";

export const ExpensesPerCategory = ({
  categoriesSummary,
}: {
  categoriesSummary: Dashboard["categoriesSummary"];
}) => {
  return (
    <ScrollArea className="col-span-2 h-full rounded-md border p-6">
      <CardHeader>
        <CardTitle className="font-bold">Expenses per Category</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {Object.keys(categoriesSummary).map((categoryName) => {
          const category = categoriesSummary[categoryName];
          return (
            <div key={categoryName} className="space-y-2">
              <div className="flex w-full justify-between">
                <p className="text-sm font-bold">
                  {categoryName.toUpperCase()}
                </p>
                <p className="text-sm font-bold">{category.percentage}%</p>
              </div>
              <Progress value={category.percentage} />
              <p className="text-sm font-bold text-muted-foreground">
                {moneyFormat(category.total / 100)}
              </p>
            </div>
          );
        })}
      </CardContent>
    </ScrollArea>
  );
};

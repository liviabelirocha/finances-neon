import { Dashboard } from "@/_actions/transactions/types";
import { CardContent, CardHeader, CardTitle } from "@/_components/ui/card";
import { Progress } from "@/_components/ui/progress";
import { ScrollArea } from "@/_components/ui/scroll-area";

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
            </div>
          );
        })}
      </CardContent>
    </ScrollArea>
  );
};

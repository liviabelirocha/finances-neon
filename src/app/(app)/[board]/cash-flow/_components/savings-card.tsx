import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCents } from "@/lib/money-format";
import Link from "next/link";
import { STATUS_COLOR } from "./status";

const Figure = ({
  label,
  cents,
  caption,
  color,
}: {
  label: string;
  cents: number;
  caption: string;
  color?: string;
}) => (
  <div>
    <p className="text-sm text-muted-foreground">{label}</p>
    <p className="text-xl font-bold sm:text-2xl" style={{ color }}>
      {formatCents(cents)}
    </p>
    <p className="text-sm text-muted-foreground">{caption}</p>
  </div>
);

export const SavingsCard = ({
  boardId,
  hasSavingsRules,
  savingsTarget,
  savingsActual,
}: {
  boardId: string;
  hasSavingsRules: boolean;
  savingsTarget: number;
  savingsActual: number;
}) => {
  const gap = savingsTarget - savingsActual;

  return (
    <Card>
      <CardHeader className="p-4 md:p-6">
        <CardTitle className="text-base">Savings this month</CardTitle>
        <CardDescription>
          What was left after spending vs. what actually went to savings.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0 md:p-6 md:pt-0">
        {hasSavingsRules ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Figure
              label="Should have saved"
              cents={savingsTarget}
              caption="received − spent"
              color={savingsTarget < 0 ? STATUS_COLOR.bad : undefined}
            />
            <Figure
              label="Actually saved"
              cents={savingsActual}
              caption="moved to your savings metas"
            />
            <Figure
              label="Difference"
              cents={gap}
              caption={
                gap > 0
                  ? "left in the account, could be saved"
                  : "saved everything that was left"
              }
              color={STATUS_COLOR[gap > 0 ? "warning" : "good"]}
            />
          </div>
        ) : (
          <div className="flex flex-col items-start gap-3">
            <p className="text-sm text-muted-foreground">
              Pick the AUVP metas you save into (e.g. Liberdade Financeira) to
              compare what you should have saved with what you did.
            </p>
            <Button asChild variant="outline" size="sm">
              <Link href={`/${boardId}/settings/integrations`}>
                Choose savings metas
              </Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

import { getIgnoreRules } from "@/actions/integrations/get-ignore-rules";
import { getIntegrationStatus } from "@/actions/integrations/get-status";
import { IgnoreRulesCard } from "./_components/ignore-rules-card";
import { IntegrationCard } from "./_components/integration-card";

export default async function IntegrationsSettingsPage({
  params,
}: {
  params: Promise<{ board: string }>;
}) {
  const { board: boardId } = await params;

  const [status, ignoreRules] = await Promise.all([
    getIntegrationStatus(boardId),
    getIgnoreRules(boardId),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Integrations</h1>
        <p className="text-muted-foreground">
          Connect your AUVP API key to unlock the daily budget view. The key is
          validated before saving and stored encrypted.
        </p>
      </div>

      <IntegrationCard
        boardId={boardId}
        title="AUVP Financeiro"
        description="Reads your bank accounts and transactions."
        {...status}
      />

      {ignoreRules.status === "ok" && (
        <IgnoreRulesCard
          boardId={boardId}
          budgets={ignoreRules.budgets}
          tags={ignoreRules.tags}
          budgetIds={ignoreRules.budgetIds}
          tagIds={ignoreRules.tagIds}
        />
      )}

      {ignoreRules.status === "unavailable" && (
        <p className="rounded-md border p-6 text-sm text-muted-foreground">
          Couldn&apos;t load your AUVP metas and tags, so the ignore rules
          can&apos;t be edited right now.
        </p>
      )}
    </div>
  );
}

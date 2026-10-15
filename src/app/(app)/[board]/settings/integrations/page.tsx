import { getIntegrationStatus } from "@/actions/integrations/get-status";
import { IntegrationCard } from "./_components/integration-card";

export default async function IntegrationsSettingsPage({
  params,
}: {
  params: Promise<{ board: string }>;
}) {
  const { board: boardId } = await params;

  const status = await getIntegrationStatus(boardId);

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
    </div>
  );
}

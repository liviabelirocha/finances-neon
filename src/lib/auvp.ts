import "server-only";

const AUVP_BASE_URL = "https://financas-api.auvp.com.br";

export type AuvpAccount = {
  id: number;
  type: "BANK" | "CREDIT";
};

export type AuvpTransaction = {
  amount: number;
  date: string;
  description: string;
  accountId: number;
  budgetId: number | null;
  tagIds: number[];
  ignore: boolean;
  is_internal_transfer: boolean;
};

export type AuvpBudget = {
  id: number;
  name: string;
};

export type AuvpTag = {
  id: number;
  name: string;
};

export class AuvpAuthError extends Error {
  constructor() {
    super("Invalid AUVP API key");
  }
}

const auvpFetch = async <T>(
  apiKey: string,
  path: string,
  query?: Record<string, string | number | boolean>,
): Promise<T> => {
  const url = new URL(path, AUVP_BASE_URL);

  Object.entries(query ?? {}).forEach(([key, value]) =>
    url.searchParams.set(key, String(value)),
  );

  const response = await fetch(url, {
    headers: { "x-api-key": apiKey },
    cache: "no-store",
  });

  if (response.status === 401 || response.status === 403)
    throw new AuvpAuthError();

  if (!response.ok)
    throw new Error(`AUVP ${path} failed with status ${response.status}`);

  return response.json();
};

export const listAccounts = async (apiKey: string) =>
  (await auvpFetch<{ accounts: AuvpAccount[] }>(apiKey, "/accounts")).accounts;

export const listBudgets = async (apiKey: string) =>
  auvpFetch<AuvpBudget[]>(apiKey, "/budgets");

export const listTags = async (apiKey: string) =>
  (await auvpFetch<{ data: AuvpTag[] }>(apiKey, "/tags")).data;

/** Only a rejected key is invalid; outages and other failures are rethrown. */
export const validateAuvpKey = async (apiKey: string) => {
  try {
    await listAccounts(apiKey);
    return true;
  } catch (error) {
    if (error instanceof AuvpAuthError) return false;
    throw error;
  }
};

export const listTransactions = async (
  apiKey: string,
  { from, to }: { from: string; to: string },
) => {
  const transactions: AuvpTransaction[] = [];
  let page = 1;
  let totalPages = 1;

  do {
    // Bill payments and transfers between own accounts are returned by
    // default; `includeInternalTransfers=true` would return only those.
    const data = await auvpFetch<{
      transactions: AuvpTransaction[];
      pagination: { totalPages: number };
    }>(apiKey, "/transactions", { from, to, page, limit: 100 });

    transactions.push(...data.transactions);
    totalPages = data.pagination.totalPages;
    page++;
  } while (page <= totalPages);

  return transactions;
};

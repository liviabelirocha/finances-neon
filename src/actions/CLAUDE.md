# Server Actions

All server actions follow these conventions:
- Marked with `"use server"` directive
- Validate authentication via `auth()` from `@/lib/auth`
- Board-scoped actions call `assertBoardMember(boardId)` from `@/lib/board-member` (throws unless the user belongs to the board, returns their `userId`)
- Use Zod schemas for input validation (in separate `schema.ts` files)
- Call `revalidatePath()` after mutations to refresh UI

## Board Operations

### `board/create.ts`
Creates a new board and associates it with the authenticated user via `UserBoard`.

### `board/delete.ts`
Deletes a board. Cascade delete removes all associated transactions, tags, and user-board relations.

### `join-board/index.ts`
Adds the authenticated user to an existing board via invite link. Checks if user is already a member.

## Transaction Operations

### `upsert-transaction/index.ts`
Creates or updates a transaction. Key features:
- **Installments**: When creating with `installments > 1`, creates multiple transactions with incremented dates
- **Schema**: See `upsert-transaction/schema.ts` for validation rules
- Amount is expected in **cents** (integer)

### `delete-transaction/index.ts`
Deletes a single transaction by ID.

### `add-bulk-transactions/index.ts`
Bulk import transactions from CSV data. Expects an array of transaction objects matching the schema in `add-bulk-transactions/schema.ts`.

## Transaction Queries

### `transactions/get-dashboard.ts`
Main dashboard data fetcher. Returns:
- `summaryByType`: Grouped totals by transaction type
- `summaryByCategory`: Grouped totals by tag (for expenses)
- `lastTransactions`: Recent transactions (limit 10)

Supports visualization modes: `monthly`, `yearly`, `all-time`.

### `transactions/month-transactions.ts`
Fetches all transactions for a specific month/year period with tag relations.

### `transactions/summary-by-type.ts`
Aggregates transaction amounts grouped by `TransactionType` enum.

### `transactions/summary-by-category.ts`
Aggregates expense amounts grouped by tag/category.

### `transactions/types.ts`
Shared TypeScript types for transaction queries.

## Tag Operations

### `tags/create.ts`
Creates a new tag (category) for a board.

### `tags/list.ts`
Lists all tags for a given board.

## Integrations

### `integrations/save.ts` / `remove.ts` / `get-status.ts`
Manage the per-board AUVP API key (`BoardIntegration`). The key is validated with a live call before saving, stored encrypted (`lib/crypto.ts`) and never returned to the client — `get-status` only exposes `configured` and the last 4 chars (`last4` is null when the stored key can't be decrypted, e.g. after rotating `INTEGRATIONS_ENCRYPTION_KEY`); its `isIntegrationConfigured` is a cheap no-decrypt check used by the navbar. A key is only reported invalid when AUVP answers 401/403; other failures throw. Decryption lives in `lib/integrations.ts` (server-only), not in an action.

### `integrations/get-ignore-rules.ts` / `save-ignore-rules.ts`
AUVP budgets ("metas", e.g. Liberdade Financeira) and tags whose transactions the daily budget ignores (e.g. investments, which AUVP counts as spending). `get-ignore-rules` returns the selected ids plus the options from AUVP's `/budgets` and `/tags`; it returns `unavailable` instead of throwing when AUVP fails, so the settings page still loads and the key can be replaced.

## Daily Budget (AUVP)

### `cash-flow/get-daily.ts`
Fetches the month's transactions (all accounts, with a day of margin on each side since AUVP dates may be read as UTC) from the AUVP API (`lib/auvp.ts`) and builds the daily budget with `cash-flow/build-daily.ts`. Spending comes only from AUVP — not from this app's own transactions:
- Requires the month's **expected income** (`ExpectedIncome`); without it returns `missing-income` with the latest registered amount as a suggestion. It is fixed upfront because weekly paychecks would make a budget based on received income jump.
- **Available per day** = (expected income − spent before that day) ÷ remaining days; future days share what is left evenly.
- **Spent** counts purchases on the purchase date (debit, PIX and credit card). Bill payments, transfers between own accounts (`is_internal_transfer`) and ignored transactions are excluded. Transactions matching the board's ignore rules (budget or tag) are kept as `ignored` items: shown in the day's breakdown, counted as neither spending nor income.
- **Status**: `good` (< 80% of available), `warning` (80–100%), `bad` (> 100%).
- **savedVsPace** = even share of the expected income for the elapsed days − spent so far.
- `receivedIncome` (bank credits in the month) is returned for comparison only.

## Expected Income

### `expected-income/upsert.ts`
Creates or updates the expected income (cents) for a board's month (`month` is 0-11, like the URL params).

## Adding New Actions

1. Create a new directory under `src/actions/` for the feature
2. Add `index.ts` with the `"use server"` directive
3. Create `schema.ts` if input validation is needed
4. Always check authentication at the start
5. Call `revalidatePath()` after mutations

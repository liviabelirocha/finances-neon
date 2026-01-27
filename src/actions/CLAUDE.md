# Server Actions

All server actions follow these conventions:
- Marked with `"use server"` directive
- Validate authentication via `auth()` from `@/lib/auth`
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

## AI Features

### `generate-ai-report/index.ts`
Generates an AI-powered financial report using Mistral API. Takes transaction data and returns markdown analysis.

## Adding New Actions

1. Create a new directory under `src/actions/` for the feature
2. Add `index.ts` with the `"use server"` directive
3. Create `schema.ts` if input validation is needed
4. Always check authentication at the start
5. Call `revalidatePath()` after mutations

# Components

## Directory Structure

```
components/
├── ui/                        # Shadcn UI primitives (auto-generated)
├── navbar/                    # Navigation bar
├── upsert-transaction-form/   # Transaction create/edit form
├── csv-reader/                # CSV bulk import
├── more-features/             # Feature showcase dialog
├── add-transaction-button.tsx # Button to open transaction form
├── delete-button.tsx          # Confirmation delete button
├── month-selector.tsx         # Month/year navigation
└── logo.tsx                   # Application logo
```

## Core Components

### `upsert-transaction-form/`
Slide-out sheet form for creating or editing transactions.
- **Form fields**: name, amount, type, method, date, tag, installments
- **Installments**: Only shown in create mode; creates multiple transactions
- **Uses**: React Hook Form, Zod validation, Shadcn Sheet

### `csv-reader/`
Bulk import transactions from CSV files.
- Shows file format requirements
- Validates and previews data before import
- Displays errors for invalid rows

### `navbar/`
Application navigation bar with:
- Logo and navigation links
- Active link highlighting based on current route
- "Generate Invite" button to share board
- Clerk user button

### `month-selector.tsx`
Date navigation component using URL search params.
- Previous/next month arrows
- Displays current month/year
- Updates via `QueryContext`

### `delete-button.tsx`
Reusable delete button with confirmation dialog.
- Generic: accepts any async delete action
- Shows loading state during deletion

### `add-transaction-button.tsx`
Opens the transaction form sheet for creating new transactions.

## UI Directory (`ui/`)

Contains Shadcn UI components (Radix-based primitives). These are auto-generated via:
```bash
npx shadcn@latest add <component>
```

Available components: Button, Card, Dialog, Form, Input, Label, Popover, Progress, ScrollArea, Select, Separator, Sheet, Switch, Table, Tabs, Toast, Toaster

## Component Conventions

1. **Client Components**: Mark with `"use client"` for interactivity
2. **Server Components**: Default for data fetching (no directive needed)
3. **Private Components**: Use `_components/` folder within route directories
4. **Styling**: Use Tailwind utility classes
5. **Forms**: Always use React Hook Form + Zod for validation

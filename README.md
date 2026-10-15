# Finances-Neon

A multi-user personal finance management application for tracking income, expenses, and investments across shared boards.

## Features

### Boards

- Create multiple finance boards
- Invite others via shareable links
- Each board has its own transactions and categories

### Transaction Management

- **Transaction types**: Income, Expense, Investment, Investment Withdrawal
- **Payment methods**: PIX (Brazilian instant payment), Card, Cash, Other
- **Categories/Tags**: Create custom categories per board
- **Installments**: Split payments across multiple months automatically
- **Recurring transactions**: Set up monthly recurring expenses as templates

### Dashboard Analytics

- Summary cards: Balance, Income, Expenses, Invested amounts
- Pie chart visualization of transaction type breakdown
- Expense breakdown by category with progress bars
- Recent transactions list
- Filter by: Monthly, Yearly, or All-time views

### Data Import/Export

- CSV bulk import with validation

### Daily Budget (AUVP)

- Connect an AUVP Financeiro API key per board (Settings → Integrations)
- See how much you can spend each day based on what came in and went out
- Each day is green, yellow or red depending on how much of the daily budget was spent

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Clerk
- **UI**: Tailwind CSS + Shadcn UI (Radix primitives)
- **Charts**: Recharts
- **Forms**: React Hook Form + Zod validation
- **Tables**: TanStack React Table

## Getting Started

### Prerequisites

- Node.js 18+
- Docker (for PostgreSQL) or a PostgreSQL instance

### Setup

1. Clone the repository

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start PostgreSQL via Docker:

   ```bash
   docker-compose up -d
   ```

4. Create a `.env` file with the following variables:

   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/finances"

   # Clerk authentication (get from clerk.com)
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   CLERK_SECRET_KEY=

   # Encrypts the per-board AUVP API key (any random secret)
   INTEGRATIONS_ENCRYPTION_KEY=
   ```

5. Set up the database:

   ```bash
   npm run setup:db
   ```

6. Start the development server:

   ```bash
   npm run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000)

## Commands

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run db           # Pull DB schema and generate Prisma client
npm run setup:db     # Full DB setup (migrate, pull, generate)
```

## Architecture Notes

- **Money handling**: Amounts are stored as integers (cents) in the database
- **URL-based state**: Month/year filters are managed via URL search parameters
- **Server actions**: All data mutations use Next.js server actions with Zod validation

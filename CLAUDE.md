# Finances-Neon

A personal finance management application built with Next.js 14, featuring multi-user boards, transaction tracking, and financial analytics.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Clerk
- **UI**: Tailwind CSS + Shadcn UI (Radix primitives)
- **Charts**: Recharts
- **Forms**: React Hook Form + Zod validation
- **Tables**: TanStack React Table

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (app)/             # Protected routes (requires auth)
│   │   ├── (boards)/      # Boards list (home page)
│   │   ├── [board]/       # Dynamic board routes
│   │   │   ├── (dashboard)/ # Main dashboard view
│   │   │   └── transactions/ # Transaction list
│   │   └── join/          # Join board via invite
│   └── login/             # Authentication page
├── actions/               # Server actions (see actions/CLAUDE.md)
├── components/            # Reusable components (see components/CLAUDE.md)
├── contexts/              # React context providers
├── lib/                   # Utilities (prisma client, auth, formatting)
├── hooks/                 # Custom React hooks
└── constants/             # Application constants
prisma/                    # Database schema (see prisma/CLAUDE.md)
```

## Key Commands

```bash
npm run dev          # Start dev server (includes DB sync)
npm run build        # Production build
npm run db           # Pull DB schema and generate Prisma client
npm run setup:db     # Full DB setup (migrate, pull, generate)
```

## Development Setup

1. Start PostgreSQL via Docker: `docker-compose up -d`
2. Set up environment variables (see `.env`)
3. Run `npm run setup:db` to initialize the database
4. Run `npm run dev` to start the development server

## Architecture Patterns

### Server Actions
All data mutations use Next.js server actions in `src/actions/`. Each action:
- Validates authentication via Clerk
- Uses Zod for input validation
- Calls `revalidatePath()` after mutations

### Money Handling
Amounts are stored as **integers (cents)** in the database. Use `moneyFormat()` from `lib/money-format.ts` for display.

### URL-Based State
Month/year filters use URL search params managed via `QueryContext` in `src/contexts/query-context.tsx`.

### Component Organization
- `_components/` - Private components scoped to a route
- `_columns/` - Table column definitions
- `_features/` - Feature-specific sections

## Routes

| Route | Description |
|-------|-------------|
| `/` | Boards list (home) |
| `/login` | Clerk sign-in |
| `/[boardId]` | Dashboard for a board |
| `/[boardId]/transactions` | Transaction list |
| `/join?board=<id>` | Join board via invite |

## Environment Variables

- `DATABASE_URL` - PostgreSQL connection string
- Clerk environment variables (see Clerk docs)

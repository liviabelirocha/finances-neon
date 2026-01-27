# Database Schema

PostgreSQL database managed via Prisma ORM.

## Models

### Board
The main organizational unit. Users can belong to multiple boards.

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| name | String | Board name |

**Relations**: Has many `Tag`, `Transaction`, `UserBoard`

### UserBoard
Many-to-many join table between users and boards.

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| userId | String | Clerk user ID |
| boardId | String | FK to Board (cascade delete) |

### Transaction
Financial transaction record.

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| name | String | Transaction description |
| type | TransactionType | INCOME, EXPENSE, INVESTMENT, INVESTMENT_WITHDRAWAL |
| amount | Int | Amount in **cents** (multiply by 100) |
| method | TransactionMethod | PIX, CARD, CASH, OTHER (default: OTHER) |
| date | DateTime | Transaction date |
| tagId | String? | Optional FK to Tag |
| boardId | String | FK to Board (cascade delete) |
| createdAt | DateTime | Auto-generated |
| updatedAt | DateTime | Auto-updated |

### Tag
Category/label for transactions.

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| name | String | Tag name |
| boardId | String | FK to Board (cascade delete) |
| createdAt | DateTime | Auto-generated |
| updatedAt | DateTime | Auto-updated |

## Enums

### TransactionType
- `INCOME` - Money coming in
- `EXPENSE` - Money going out
- `INVESTMENT` - Money invested
- `INVESTMENT_WITHDRAWAL` - Investment withdrawn

### TransactionMethod
- `PIX` - Brazilian instant payment
- `CARD` - Credit/debit card
- `CASH` - Cash payment
- `OTHER` - Default/other methods

## Cascade Deletes

Deleting a Board cascades to:
- All `UserBoard` records
- All `Transaction` records
- All `Tag` records

## Commands

```bash
npx prisma generate      # Generate Prisma client
npx prisma db push       # Push schema to database
npx prisma db pull       # Pull schema from database
npx prisma migrate dev   # Create and run migration
npx prisma studio        # Open database GUI
```

## Important Notes

- **Money is stored in cents**: A transaction of R$100.00 is stored as `10000`
- **Tags are board-scoped**: Each board has its own set of tags
- **Users are Clerk IDs**: No User model; uses Clerk's `userId` string

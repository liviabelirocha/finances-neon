# Mobile Responsiveness Implementation Tasks

## Metadata
- **Created:** 2026-01-28
- **Last Updated:** 2026-01-28
- **Total Tasks:** 47
- **Completed:** 17
- **In Progress:** 0
- **Blocked:** 0

---

## 1. Login Page

**File:** `src/app/login/page.tsx`

### Tasks

- [x] **T1.1** - Add max-width constraint and responsive horizontal padding
  - **Status:** Done
  - **Dependencies:** None
  - **Change:** `"mx-auto flex h-full flex-col justify-center p-8"` → `"mx-auto flex h-full max-w-md flex-col justify-center px-4 py-8 sm:p-8"`
  - **Validation:**
    - [ ] Container has max-width on all screens
    - [ ] Padding reduces on mobile (< 640px)

- [x] **T1.2** - Add responsive title font size
  - **Status:** Done
  - **Dependencies:** None
  - **Change:** `"mb-3 text-4xl font-bold"` → `"mb-3 text-2xl font-bold sm:text-4xl"`
  - **Validation:**
    - [ ] Title is `text-2xl` on mobile
    - [ ] Title is `text-4xl` on sm+

- [x] **T1.3** - Add responsive paragraph styling
  - **Status:** Done
  - **Dependencies:** None
  - **Change:** `"mb-8 text-muted-foreground"` → `"mb-6 text-sm text-muted-foreground sm:mb-8 sm:text-base"`
  - **Validation:**
    - [ ] Paragraph margin reduces on mobile
    - [ ] Font size reduces on mobile

---

## 2. Boards Page

**File:** `src/app/(app)/(boards)/page.tsx`

### Tasks

- [x] **T2.1** - Make header stack vertically on mobile
  - **Status:** Done
  - **Dependencies:** None
  - **Change:** `"flex w-full items-center justify-between"` → `"flex flex-col gap-4 sm:flex-row sm:w-full sm:items-center sm:justify-between"`
  - **Validation:**
    - [ ] Header stacks vertically on mobile
    - [ ] Header is horizontal on sm+

- [x] **T2.2** - Add responsive title font size
  - **Status:** Done
  - **Dependencies:** None
  - **Change:** `"text-2xl font-bold"` → `"text-xl font-bold sm:text-2xl"`
  - **Validation:**
    - [ ] Title is `text-xl` on mobile
    - [ ] Title is `text-2xl` on sm+

---

## 3. Navbar

**File:** `src/components/navbar/index.tsx`

### Tasks

- [x] **T3.1** - Add useState import and mobile menu state
  - **Status:** Done
  - **Dependencies:** None
  - **Change:** Add `import { useState } from "react"` and `const [mobileMenuOpen, setMobileMenuOpen] = useState(false)`
  - **Validation:**
    - [ ] State variable exists
    - [ ] No TypeScript errors

- [x] **T3.2** - Add Menu icon import
  - **Status:** Done
  - **Dependencies:** None
  - **Change:** Add `import { Menu } from "lucide-react"`
  - **Validation:**
    - [ ] Import exists

- [x] **T3.3** - Add Button and Sheet component imports
  - **Status:** Done
  - **Dependencies:** None
  - **Change:** Add `import { Button } from "../ui/button"` and `import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet"`
  - **Validation:**
    - [ ] Imports exist
    - [ ] No TypeScript errors

- [x] **T3.4** - Add responsive padding to nav element
  - **Status:** Done
  - **Dependencies:** None
  - **Change:** `"flex justify-between border-b border-solid px-8 py-4"` → `"flex justify-between border-b border-solid px-4 py-3 md:px-8 md:py-4"`
  - **Validation:**
    - [ ] Padding reduces on mobile

- [x] **T3.5** - Add responsive gap to logo container
  - **Status:** Done
  - **Dependencies:** None
  - **Change:** `"flex items-center gap-10"` → `"flex items-center gap-4 md:gap-10"`
  - **Validation:**
    - [ ] Gap reduces on mobile

- [x] **T3.6** - Extract NavLinks as reusable component
  - **Status:** Done
  - **Dependencies:** T3.1
  - **Change:** Create `NavLinks` component with `onNavigate` prop that renders all ActiveLink elements
  - **Validation:**
    - [ ] NavLinks component exists
    - [ ] Accepts onNavigate callback prop

- [x] **T3.7** - Hide desktop navigation on mobile
  - **Status:** Done
  - **Dependencies:** T3.6
  - **Change:** Wrap desktop nav links in `<div className="hidden md:flex md:items-center md:gap-10">`
  - **Validation:**
    - [ ] Nav links hidden on mobile (< 768px)
    - [ ] Nav links visible on md+

- [x] **T3.8** - Hide desktop right-side actions on mobile
  - **Status:** Done
  - **Dependencies:** None
  - **Change:** Add `"hidden md:flex md:items-center md:gap-4"` to right-side container
  - **Validation:**
    - [ ] GenerateInviteLink hidden on mobile
    - [ ] UserButton with showName hidden on mobile

- [x] **T3.9** - Add mobile header actions (UserButton + hamburger)
  - **Status:** Done
  - **Dependencies:** T3.1, T3.2, T3.3
  - **Change:** Add new div with `"flex items-center gap-2 md:hidden"` containing UserButton (no showName) and hamburger Button
  - **Validation:**
    - [ ] UserButton visible on mobile (no name)
    - [ ] Hamburger button visible on mobile
    - [ ] Both hidden on md+

- [x] **T3.10** - Add Sheet-based mobile menu
  - **Status:** Done
  - **Dependencies:** T3.1, T3.3, T3.6
  - **Change:** Add Sheet component with left side, containing Logo in header and NavLinks in body
  - **Validation:**
    - [ ] Sheet opens when hamburger clicked
    - [ ] Sheet closes when link clicked
    - [ ] Logo appears in sheet header
    - [ ] All navigation links appear in sheet

- [x] **T3.11** - Add GenerateInviteLink to mobile menu
  - **Status:** Done
  - **Dependencies:** T3.10
  - **Change:** Add GenerateInviteLink inside mobile menu Sheet when params.board exists
  - **Validation:**
    - [ ] Invite link appears in mobile menu when on board page
    - [ ] Hidden when not on board page

---

## 4. ActiveLink Component

**File:** `src/components/navbar/components/active-link.tsx`

### Tasks

- [x] **T4.1** - Add onClick prop to component
  - **Status:** Done
  - **Dependencies:** None
  - **Change:** Add `onClick?: () => void` to props type and pass to Link component
  - **Validation:**
    - [ ] onClick prop accepted
    - [ ] onClick fires when link clicked

---

## 5. App Layout

**File:** `src/app/(app)/layout.tsx`

### Tasks

- [ ] **T5.1** - Add responsive margin
  - **Status:** Not Started
  - **Dependencies:** None
  - **Change:** `"m-6"` → `"m-4 md:m-6"`
  - **Validation:**
    - [ ] Margin is 16px on mobile
    - [ ] Margin is 24px on md+

---

## 6. Dashboard Page

**File:** `src/app/(app)/[board]/(dashboard)/page.tsx`

### Tasks

- [ ] **T6.1** - Make header stack vertically on mobile
  - **Status:** Not Started
  - **Dependencies:** None
  - **Change:** `"flex items-center justify-between"` → `"flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"`
  - **Validation:**
    - [ ] Header stacks on mobile
    - [ ] Header is horizontal on sm+

- [ ] **T6.2** - Remove nested header div, add responsive title
  - **Status:** Not Started
  - **Dependencies:** T6.1
  - **Change:** Remove `<div className="flex items-center gap-2">` wrapper, change title to `"text-xl font-bold sm:text-2xl"`
  - **Validation:**
    - [ ] Title is text-xl on mobile
    - [ ] Title is text-2xl on sm+

- [ ] **T6.3** - Add flex-wrap to header controls
  - **Status:** Not Started
  - **Dependencies:** None
  - **Change:** `"flex gap-2"` → `"flex flex-wrap items-center gap-2"`
  - **Validation:**
    - [ ] Controls wrap on narrow screens

- [ ] **T6.4** - Make main grid collapse on mobile
  - **Status:** Not Started
  - **Dependencies:** None
  - **Change:** `"grid h-full grid-cols-[2fr,1fr] gap-6 overflow-hidden"` → `"flex flex-col gap-6 overflow-auto lg:grid lg:h-full lg:grid-cols-[2fr,1fr] lg:overflow-hidden"`
  - **Validation:**
    - [ ] Single column stack on mobile
    - [ ] Two-column grid on lg+
    - [ ] Scrollable on mobile

- [ ] **T6.5** - Update left column for mobile
  - **Status:** Not Started
  - **Dependencies:** T6.4
  - **Change:** `"flex flex-col gap-6 overflow-hidden"` → `"flex flex-col gap-6 lg:overflow-hidden"`
  - **Validation:**
    - [ ] No overflow-hidden on mobile

- [ ] **T6.6** - Make charts grid collapse on mobile
  - **Status:** Not Started
  - **Dependencies:** T6.4
  - **Change:** `"grid h-full grid-cols-3 grid-rows-1 gap-6 overflow-hidden"` → `"flex flex-col gap-6 md:grid md:h-full md:grid-cols-3 md:grid-rows-1 md:overflow-hidden"`
  - **Validation:**
    - [ ] Charts stack on mobile
    - [ ] Three-column grid on md+

---

## 7. Summary Cards

**File:** `src/app/(app)/[board]/(dashboard)/_features/summary-cards.tsx`

### Tasks

- [ ] **T7.1** - Make balance card content stack on mobile
  - **Status:** Not Started
  - **Dependencies:** None
  - **Change:** `"flex justify-between"` → `"flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"`
  - **Validation:**
    - [ ] Balance and button stack on mobile
    - [ ] Horizontal layout on sm+

- [ ] **T7.2** - Add responsive balance amount font size
  - **Status:** Not Started
  - **Dependencies:** None
  - **Change:** `"text-4xl font-bold"` → `"text-2xl font-bold sm:text-4xl"`
  - **Validation:**
    - [ ] Balance is text-2xl on mobile
    - [ ] Balance is text-4xl on sm+

- [ ] **T7.3** - Make cards grid responsive
  - **Status:** Not Started
  - **Dependencies:** None
  - **Change:** `"grid grid-cols-3 gap-6"` → `"grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6"`
  - **Validation:**
    - [ ] 1 column on mobile
    - [ ] 2 columns on sm
    - [ ] 3 columns on md+

- [ ] **T7.4** - Add responsive font size to card amounts
  - **Status:** Not Started
  - **Dependencies:** None
  - **Change:** All `"text-2xl font-bold"` → `"text-xl font-bold sm:text-2xl"` (3 instances)
  - **Validation:**
    - [ ] Amounts are text-xl on mobile
    - [ ] Amounts are text-2xl on sm+

---

## 8. Summary Card Component

**File:** `src/app/(app)/[board]/(dashboard)/_components/summary-card.tsx`

### Tasks

- [ ] **T8.1** - Add responsive CardHeader padding and gap
  - **Status:** Not Started
  - **Dependencies:** None
  - **Change:** `"flex-row items-center gap-4"` → `"flex-row items-center gap-2 p-4 md:gap-4 md:p-6"`
  - **Validation:**
    - [ ] Smaller gap on mobile
    - [ ] Smaller padding on mobile

- [ ] **T8.2** - Add responsive CardContent padding
  - **Status:** Not Started
  - **Dependencies:** None
  - **Change:** Add `className="p-4 pt-0 md:p-6 md:pt-0"` to CardContent
  - **Validation:**
    - [ ] Smaller padding on mobile

---

## 9. Transactions Pie Chart

**File:** `src/app/(app)/[board]/(dashboard)/_components/transactions-pie-chart.tsx`

### Tasks

- [ ] **T9.1** - Add responsive Card padding
  - **Status:** Not Started
  - **Dependencies:** None
  - **Change:** `"flex flex-col p-6"` → `"flex flex-col p-4 md:p-6"`
  - **Validation:**
    - [ ] Smaller padding on mobile

- [ ] **T9.2** - Add responsive chart max-height
  - **Status:** Not Started
  - **Dependencies:** None
  - **Change:** `"mx-auto aspect-square max-h-[250px]"` → `"mx-auto aspect-square max-h-[180px] sm:max-h-[250px]"`
  - **Validation:**
    - [ ] Smaller chart on mobile
    - [ ] Full size on sm+

---

## 10. Expenses Per Category

**File:** `src/app/(app)/[board]/(dashboard)/_components/expenses-per-category.tsx`

### Tasks

- [ ] **T10.1** - Update ScrollArea classes for mobile
  - **Status:** Not Started
  - **Dependencies:** None
  - **Change:** `"col-span-2 h-full rounded-md border p-6"` → `"h-full min-h-[250px] rounded-md border p-4 md:col-span-2 md:p-6"`
  - **Validation:**
    - [ ] No col-span on mobile
    - [ ] Has min-height on mobile
    - [ ] Smaller padding on mobile
    - [ ] col-span-2 on md+

---

## 11. Last Transactions

**File:** `src/app/(app)/[board]/(dashboard)/_components/last-transactions.tsx`

### Tasks

- [ ] **T11.1** - Add max-height on mobile to ScrollArea
  - **Status:** Not Started
  - **Dependencies:** None
  - **Change:** `"rounded-md border"` → `"max-h-[350px] rounded-md border lg:max-h-none"`
  - **Validation:**
    - [ ] Has max-height on mobile
    - [ ] No max-height on lg+

- [ ] **T11.2** - Add gap to transaction item wrapper
  - **Status:** Not Started
  - **Dependencies:** None
  - **Change:** `"flex items-center justify-between"` → `"flex items-center justify-between gap-2"`
  - **Validation:**
    - [ ] Gap between name and amount

- [ ] **T11.3** - Make icon container shrink-proof with responsive padding
  - **Status:** Not Started
  - **Dependencies:** None
  - **Change:** `"rounded-lg bg-white bg-opacity-[3%] p-3"` → `"shrink-0 rounded-lg bg-white bg-opacity-[3%] p-2 md:p-3"`
  - **Validation:**
    - [ ] Icon doesn't shrink
    - [ ] Smaller padding on mobile

- [ ] **T11.4** - Add min-w-0 to name container wrapper
  - **Status:** Not Started
  - **Dependencies:** None
  - **Change:** Add `className="min-w-0"` to the div wrapping name and date
  - **Validation:**
    - [ ] Container can shrink below content size

- [ ] **T11.5** - Add truncate to transaction name
  - **Status:** Not Started
  - **Dependencies:** T11.4
  - **Change:** `"text-sm font-bold"` → `"truncate text-sm font-bold"`
  - **Validation:**
    - [ ] Long names truncate with ellipsis

- [ ] **T11.6** - Add responsive font size to date
  - **Status:** Not Started
  - **Dependencies:** None
  - **Change:** `"text-sm text-muted-foreground"` → `"text-xs text-muted-foreground md:text-sm"`
  - **Validation:**
    - [ ] Smaller date text on mobile

- [ ] **T11.7** - Add shrink-0 to amount element
  - **Status:** Not Started
  - **Dependencies:** None
  - **Change:** Add `shrink-0` to amount text className
  - **Validation:**
    - [ ] Amount doesn't shrink

---

## 12. Transactions Page

**File:** `src/app/(app)/[board]/transactions/page.tsx`

### Tasks

- [ ] **T12.1** - Make header stack vertically on mobile
  - **Status:** Not Started
  - **Dependencies:** None
  - **Change:** `"flex w-full items-center justify-between"` → `"flex flex-col gap-4 sm:flex-row sm:w-full sm:items-center sm:justify-between"`
  - **Validation:**
    - [ ] Header stacks on mobile
    - [ ] Header is horizontal on sm+

- [ ] **T12.2** - Add responsive title font size
  - **Status:** Not Started
  - **Dependencies:** None
  - **Change:** `"text-2xl font-bold"` → `"text-xl font-bold sm:text-2xl"`
  - **Validation:**
    - [ ] Title is text-xl on mobile
    - [ ] Title is text-2xl on sm+

---

## 13. DataTable Component

**File:** `src/components/ui/data-table.tsx`

### Tasks

- [ ] **T13.1** - Add VisibilityState import
  - **Status:** Not Started
  - **Dependencies:** None
  - **Change:** Add `VisibilityState` to @tanstack/react-table imports
  - **Validation:**
    - [ ] Import exists

- [ ] **T13.2** - Add useEffect import
  - **Status:** Not Started
  - **Dependencies:** None
  - **Change:** Add `useEffect` to react imports
  - **Validation:**
    - [ ] Import exists

- [ ] **T13.3** - Add columnVisibility state
  - **Status:** Not Started
  - **Dependencies:** T13.1
  - **Change:** Add `const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})`
  - **Validation:**
    - [ ] State variable exists

- [ ] **T13.4** - Add resize listener for column visibility
  - **Status:** Not Started
  - **Dependencies:** T13.2, T13.3
  - **Change:** Add useEffect that sets column visibility based on window width (hide type, tag, date on < 768px)
  - **Validation:**
    - [ ] Columns hide on mobile
    - [ ] Columns show on md+
    - [ ] Listener cleaned up on unmount

- [ ] **T13.5** - Add columnVisibility to useReactTable
  - **Status:** Not Started
  - **Dependencies:** T13.3, T13.4
  - **Change:** Add `onColumnVisibilityChange: setColumnVisibility` and add `columnVisibility` to state object
  - **Validation:**
    - [ ] Table respects visibility state

---

## 14. Add Transaction Button

**File:** `src/components/add-transaction-button.tsx`

### Tasks

- [ ] **T14.1** - Add responsive button text
  - **Status:** Not Started
  - **Dependencies:** None
  - **Change:** Replace `Add transaction` text with `<span className="hidden sm:inline">Add transaction</span><span className="sm:hidden">Add</span>`
  - **Validation:**
    - [ ] Shows "Add" on mobile
    - [ ] Shows "Add transaction" on sm+

- [ ] **T14.2** - Add size class to icon
  - **Status:** Not Started
  - **Dependencies:** None
  - **Change:** Add `className="h-4 w-4"` to ArrowDownUpIcon
  - **Validation:**
    - [ ] Icon has consistent size

---

## 15. Generate Invite Link Button

**File:** `src/components/navbar/components/generate-invite-link.tsx`

### Tasks

- [ ] **T15.1** - Add responsive button text
  - **Status:** Not Started
  - **Dependencies:** None
  - **Change:** Replace `Generate invite link` text with `<span className="hidden sm:inline">Generate invite link</span><span className="sm:hidden">Share board</span>`
  - **Validation:**
    - [ ] Shows "Share board" on mobile
    - [ ] Shows "Generate invite link" on sm+

- [ ] **T15.2** - Add responsive width and icon size
  - **Status:** Not Started
  - **Dependencies:** None
  - **Change:** Add `className="w-full md:w-auto"` to Button, add `className="h-4 w-4"` to Link icon
  - **Validation:**
    - [ ] Button is full-width in mobile menu
    - [ ] Button is auto-width on desktop

---

## Verification Checklist

### Viewport Testing
- [ ] 320px (small mobile)
- [ ] 375px (standard mobile)
- [ ] 414px (large mobile)
- [ ] 640px (sm breakpoint)
- [ ] 768px (md breakpoint)
- [ ] 1024px (lg breakpoint)
- [ ] 1280px (xl breakpoint)

### Interaction Testing
- [ ] Mobile menu opens and closes
- [ ] Navigation links work from mobile menu
- [ ] Mobile menu closes on navigation
- [ ] Forms accessible on mobile
- [ ] Charts render at smaller sizes
- [ ] Tables scroll horizontally if needed
- [ ] Touch targets minimum 44px
- [ ] Text readable without zooming

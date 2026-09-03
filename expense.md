# Expense Pages

## Overview

The expense feature has two admin pages:

- Dashboard: `/admin/expense`
- Ledger: `/admin/expense/ledger`

Both pages are client components and use React Query hooks to load expense data from the API.

## Dashboard

Source: `app/admin/expense/page.tsx`

The dashboard provides:

- Add expense action using `AddExpenseDialog`.
- Date presets: Today, Last 7 days, Last 30 days, and Last 90 days.
- Custom start and end date inputs.
- Total spend summary.
- Top three categories shown vertically with rank, category name, and amount.
- Payment mix shown as a donut pie chart with UPI and Cash values.
- Expense analysis tabs:
  - By category.
  - By recipient.
- Expense ledger preview.
- Daily spend trend.
- Refresh action.

The dashboard `View all` link navigates to `/admin/expense/ledger`.

## Ledger

Source: `app/admin/expense/ledger/page.tsx`

The ledger is a separate, full-page expense list with filtering and sorting.

### Search

Search matches against:

- Expense description.
- Category.
- Recipient.

Search is case-insensitive and updates the visible results immediately.

### Filters

Filter controls use icon buttons as group triggers. The three primary filter groups are always visible as option rows and support multiple selection.

#### Payment method

Available values:

- All methods.
- UPI.
- Cash.
- UPI + Cash.

UPI, Cash, and UPI + Cash can be selected together. Selecting `All methods` clears the selection and shows every payment method.

#### Category

Available values come from the expense category API. Multiple categories can be selected together. Selecting `All categories` clears the selection.

#### Recipient

Available values come from the expense recipient API, plus `Unassigned`. Multiple recipients can be selected together. Selecting `All recipients` clears the selection.

### Additional filters

- Date range: Last 7 days, Last 30 days, Last 90 days, All time, or Custom range.
- Sort order: Newest first, Oldest first, Highest amount, or Lowest amount.

Date range and sort order are single-selection controls because they represent one active mode.

### Filter logic

- Multiple values inside the same filter group use OR logic.
  - Example: selecting UPI and Cash shows expenses matching either method.
- Different filter groups use AND logic.
  - Example: selecting UPI and a category shows only UPI expenses in that category.
- Empty multi-select arrays mean no restriction for that group.

### Ledger summaries

The ledger displays summaries based on the filtered results:

- Visible spend.
- Visible records.
- Average visible expense.

Each ledger record shows:

- Description or fallback category.
- Category.
- Recipient or `Unassigned`.
- Formatted date.
- Payment method.
- Total amount from Cash plus UPI.

## Data and API

### Expense type

Source: `app/admin/types/expense.ts`

`Expense` fields:

- `id: string`
- `categoryId: string`
- `category: string`
- `description: string | null`
- `upi: number`
- `cash: number`
- `createdAt: string | Date`
- `to?: string`
- `toId?: string`

### Query hooks

Source: `app/admin/hooks/expense.hooks.ts`

- `useGetExpenses(startDate, endDate)` loads expenses using the date range as part of the React Query key.
- `useGetCategories()` loads category options.
- `useGetToList()` loads recipient options.
- `useCreateExpense()` creates an expense and invalidates expense queries.
- `useCreateCategory()` creates a category and invalidates category queries.
- `useCreateTo()` creates a recipient and invalidates recipient queries.

### API functions

Source: `app/admin/api/expense.api.ts`

- `GET /expense?startDate=&endDate=` loads expenses.
- `POST /expense` creates an expense.
- `GET /expense/category` loads categories.
- `POST /expense/category` creates a category.
- `GET /expense/to` loads recipients.
- `POST /expense/to` creates a recipient.

## Navigation

The admin sidebar exposes the main Expenses route at `/admin/expense`. The dashboard ledger preview links to the separate ledger page. The ledger has a `Back to expenses` link returning to the dashboard.

## Currency and formatting

Amounts use `Intl.NumberFormat` with:

- Locale: `en-IN`
- Currency: INR
- No fractional digits

## Current validation note

The focused ESLint command used for the ledger page has previously reported a parser error during intermediate edits. The page should be linted after any further changes with:

```powershell
bunx eslint app/admin/expense/ledger/page.tsx
```

The editor diagnostics may not always surface the same parser issue, so ESLint is the authoritative focused check for this page.

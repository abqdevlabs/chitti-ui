"use client";

import { useMemo, useState } from "react";
import {
  ArrowDownAZ,
  CalendarDays,
  CalendarRange,
  ChevronLeft,
  CreditCard,
  Filter,
  RefreshCw,
  Search,
  Tag,
  Users,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import {
  useGetCategories,
  useGetExpenses,
  useGetToList,
} from "../../hooks/expense.hooks";
import { Expense } from "../../types/expense";

type DateFilter = "7d" | "30d" | "90d" | "all";
type PaymentFilter = "all" | "upi" | "cash" | "split";
type SortOrder = "newest" | "oldest" | "highest" | "lowest";
type ActiveFilter =
  | "date"
  | "payment"
  | "category"
  | "recipient"
  | "sort"
  | null;

function toDateInput(date: Date) {
  return date.toISOString().slice(0, 10);
}
function getStartDate(filter: DateFilter) {
  if (filter === "all") return "2000-01-01";
  const date = new Date();
  date.setDate(date.getDate() - Number(filter.replace("d", "")) + 1);
  return toDateInput(date);
}
function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}
function getAmount(expense: Expense) {
  return Number(expense.cash || 0) + Number(expense.upi || 0);
}
function getPaymentMethod(expense: Expense): PaymentFilter {
  const cash = Number(expense.cash || 0) > 0;
  const upi = Number(expense.upi || 0) > 0;
  return cash && upi ? "split" : upi ? "upi" : "cash";
}
function displayDate(value: string | Date) {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "Unknown date"
    : date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
}

export default function ExpenseLedgerPage() {
  const [dateFilter, setDateFilter] = useState<DateFilter>("90d");
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  const [recipientFilter, setRecipientFilter] = useState<string[]>([]);
  const [paymentFilter, setPaymentFilter] = useState<PaymentFilter[]>([]);
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const [search, setSearch] = useState("");
  const [customStart, setCustomStart] = useState(getStartDate("90d"));
  const [customEnd, setCustomEnd] = useState(toDateInput(new Date()));
  const [customOpen, setCustomOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<ActiveFilter>(null);
  const { data: categories = [] } = useGetCategories();
  const { data: toList = [] } = useGetToList();
  const startDate = customOpen ? customStart : getStartDate(dateFilter);
  const endDate = customOpen ? customEnd : toDateInput(new Date());
  const {
    data: expenses = [],
    isLoading,
    isError,
    refetch,
  } = useGetExpenses(startDate, endDate);

  const filteredExpenses = useMemo(() => {
    const query = search.trim().toLowerCase();
    return expenses
      .filter((expense) => {
        const text = [expense.description, expense.category, expense.to]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return (
          (!query || text.includes(query)) &&
          (!categoryFilter.length ||
            categoryFilter.includes(expense.category || "Uncategorised")) &&
          (!recipientFilter.length ||
            recipientFilter.includes(expense.to || "Unassigned")) &&
          (!paymentFilter.length ||
            paymentFilter.includes(getPaymentMethod(expense)))
        );
      })
      .sort((first, second) => {
        if (sortOrder === "highest" || sortOrder === "lowest") {
          const difference = getAmount(second) - getAmount(first);
          return sortOrder === "highest" ? difference : -difference;
        }
        const firstDate = new Date(first.createdAt).getTime();
        const secondDate = new Date(second.createdAt).getTime();
        return sortOrder === "newest"
          ? secondDate - firstDate
          : firstDate - secondDate;
      });
  }, [
    categoryFilter,
    expenses,
    paymentFilter,
    recipientFilter,
    search,
    sortOrder,
  ]);
  const filteredTotal = filteredExpenses.reduce(
    (total, expense) => total + getAmount(expense),
    0,
  );
  const toggleFilter = (filter: ActiveFilter) =>
    setActiveFilter(activeFilter === filter ? null : filter);
  const togglePayment = (value: PaymentFilter) =>
    setPaymentFilter((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    );
  const toggleCategory = (value: string) =>
    setCategoryFilter((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    );
  const toggleRecipient = (value: string) =>
    setRecipientFilter((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    );
  const optionClass = (selected: boolean) =>
    `rounded-lg px-3 py-2 text-xs font-semibold ${selected ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`;
  const filterButtons = [
    {
      id: "date",
      label: "Date range",
      icon: CalendarRange,
      active: customOpen || dateFilter !== "90d",
    },
    {
      id: "payment",
      label: "Payment method",
      icon: CreditCard,
      active: paymentFilter.length > 0,
    },
    {
      id: "category",
      label: "Category",
      icon: Tag,
      active: categoryFilter.length > 0,
    },
    {
      id: "recipient",
      label: "Recipient",
      icon: Users,
      active: recipientFilter.length > 0,
    },
    {
      id: "sort",
      label: "Sort order",
      icon: ArrowDownAZ,
      active: sortOrder !== "newest",
    },
  ] as const;

  return (
    <div className="space-y-6 pb-10">
      <section className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-end">
        <div>
          <Link
            href="/admin/expense"
            className="mb-4 inline-flex items-center gap-1 text-xs font-semibold text-blue-700 hover:text-blue-900"
          >
            <ChevronLeft className="h-4 w-4" /> Back to expenses
          </Link>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
            Financial control
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950">
            Expense ledger
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Search and filter every recorded expense.
          </p>
        </div>
        <button
          type="button"
          onClick={() => refetch()}
          aria-label="Refresh expense ledger"
          className="flex h-10 w-10 items-center justify-center self-start rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 sm:self-auto"
        >
          <RefreshCw className="h-4 w-4" />
        </button>
      </section>
      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-5 flex items-center gap-2">
          <Filter className="h-4 w-4 text-blue-700" />
          <h2 className="font-semibold text-slate-950">Ledger filters</h2>
          <span className="text-xs text-slate-400">
            {filteredExpenses.length} matching records
          </span>
        </div>
        <label className="block text-xs font-semibold text-slate-600">
          Search
          <div className="relative mt-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Description, category, or recipient"
              className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm font-normal text-slate-800 outline-none focus:border-blue-600"
            />
          </div>
        </label>
        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4">
          {filterButtons.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                title={item.label}
                aria-label={item.label}
                aria-pressed={activeFilter === item.id}
                onClick={() => toggleFilter(item.id as ActiveFilter)}
                className={`relative flex h-10 w-10 items-center justify-center rounded-lg border ${activeFilter === item.id ? "border-blue-600 bg-blue-50 text-blue-700" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}`}
              >
                <Icon className="h-4 w-4" />
                {item.active && (
                  <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-blue-600" />
                )}
              </button>
            );
          })}
          <span className="ml-1 text-xs text-slate-400">
            Tap an icon to refine results
          </span>
        </div>
        {activeFilter === "date" && (
          <div className="mt-4 flex flex-wrap gap-2">
            {(["7d", "30d", "90d", "all"] as DateFilter[]).map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => {
                  setDateFilter(value);
                  setCustomOpen(false);
                }}
                className={optionClass(!customOpen && dateFilter === value)}
              >
                {value === "all"
                  ? "All time"
                  : `Last ${value.replace("d", "")} days`}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setCustomOpen(true)}
              className={optionClass(customOpen)}
            >
              Custom range
            </button>
          </div>
        )}
        <div className="mt-4 border-t border-slate-100 pt-4">
          <p className="mb-2 text-xs font-semibold text-slate-600">
            Payment method
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              ["all", "All methods"],
              ["upi", "UPI"],
              ["cash", "Cash"],
              ["split", "UPI + Cash"],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() =>
                  value === "all"
                    ? setPaymentFilter([])
                    : togglePayment(value as PaymentFilter)
                }
                className={optionClass(
                  value === "all"
                    ? paymentFilter.length === 0
                    : paymentFilter.includes(value as PaymentFilter),
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-4 border-t border-slate-100 pt-4">
          <p className="mb-2 text-xs font-semibold text-slate-600">Category</p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setCategoryFilter([])}
              className={optionClass(categoryFilter.length === 0)}
            >
              All categories
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => toggleCategory(category.name)}
                className={optionClass(categoryFilter.includes(category.name))}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-4 border-t border-slate-100 pt-4">
          <p className="mb-2 text-xs font-semibold text-slate-600">Recipient</p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setRecipientFilter([])}
              className={optionClass(recipientFilter.length === 0)}
            >
              All recipients
            </button>
            <button
              type="button"
              onClick={() => toggleRecipient("Unassigned")}
              className={optionClass(recipientFilter.includes("Unassigned"))}
            >
              Unassigned
            </button>
            {toList.map((recipient) => (
              <button
                key={recipient.id}
                type="button"
                onClick={() => toggleRecipient(recipient.name)}
                className={optionClass(
                  recipientFilter.includes(recipient.name),
                )}
              >
                {recipient.name}
              </button>
            ))}
          </div>
        </div>
        {activeFilter === "sort" && (
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              ["newest", "Newest first"],
              ["oldest", "Oldest first"],
              ["highest", "Highest amount"],
              ["lowest", "Lowest amount"],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setSortOrder(value as SortOrder)}
                className={optionClass(sortOrder === value)}
              >
                {label}
              </button>
            ))}
          </div>
        )}
        {customOpen && (
          <div className="mt-4 flex flex-wrap items-end gap-3 border-t border-slate-100 pt-4">
            <CalendarDays className="mb-2 h-4 w-4 text-blue-700" />
            <label className="text-xs font-semibold text-slate-600">
              From
              <input
                type="date"
                value={customStart}
                onChange={(event) => setCustomStart(event.target.value)}
                className="mt-1 block h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm font-normal text-slate-800"
              />
            </label>
            <label className="text-xs font-semibold text-slate-600">
              To
              <input
                type="date"
                value={customEnd}
                onChange={(event) => setCustomEnd(event.target.value)}
                className="mt-1 block h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm font-normal text-slate-800"
              />
            </label>
          </div>
        )}
      </section>
      <section className="grid gap-4 sm:grid-cols-3">
        {[
          ["Visible spend", formatCurrency(filteredTotal)],
          ["Visible records", filteredExpenses.length.toString()],
          [
            "Average visible expense",
            formatCurrency(
              filteredExpenses.length
                ? filteredTotal / filteredExpenses.length
                : 0,
            ),
          ],
        ].map(([label, value]) => (
          <article
            key={label}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {label}
            </p>
            <p className="mt-3 text-2xl font-semibold text-slate-950">
              {value}
            </p>
          </article>
        ))}
      </section>
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 p-5">
          <div>
            <h2 className="font-semibold text-slate-950">All expenses</h2>
            <p className="mt-1 text-xs text-slate-500">
              Showing {startDate} to {endDate}
            </p>
          </div>
          <Wallet className="h-5 w-5 text-slate-400" />
        </div>
        {isError ? (
          <p className="p-8 text-sm text-red-600">
            Could not load expenses. Try refreshing.
          </p>
        ) : isLoading ? (
          <p className="p-8 text-sm text-slate-400">Loading expenses...</p>
        ) : filteredExpenses.length ? (
          <div className="divide-y divide-slate-100">
            {filteredExpenses.map((expense) => (
              <div
                key={expense.id}
                className="grid gap-3 px-5 py-4 sm:grid-cols-[1fr_auto_auto] sm:items-center"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-slate-800">
                    {expense.description || expense.category || "Expense"}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    {expense.category || "Uncategorised"} ·{" "}
                    {expense.to || "Unassigned"} ·{" "}
                    {displayDate(expense.createdAt)}
                  </p>
                </div>
                <span className="w-fit rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold uppercase text-slate-500">
                  {getPaymentMethod(expense) === "split"
                    ? "UPI + Cash"
                    : getPaymentMethod(expense)}
                </span>
                <p className="text-sm font-semibold text-slate-950 sm:text-right">
                  {formatCurrency(getAmount(expense))}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-10 text-center text-sm text-slate-400">
            No expenses match these filters.
          </div>
        )}
      </section>
    </div>
  );
}

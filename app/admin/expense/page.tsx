"use client";

import { useMemo, useState } from "react";
import {
  Banknote,
  CalendarDays,
  ChevronDown,
  CreditCard,
  Download,
  Plus,
  Receipt,
  RefreshCw,
  Wallet,
} from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import Link from "next/link";
import {
  useCreateCategory,
  useCreateExpense,
  useCreateTo,
  useGetCategories,
  useGetExpenses,
  useGetToList,
} from "../hooks/expense.hooks";
import { Expense } from "../types/expense";
import { AddExpenseDialog } from "./AddExpenseDialog";

type RangeKey = "today" | "7d" | "30d" | "90d";
type AnalysisTab = "category" | "recipient";

const rangeLabels: Record<RangeKey, string> = {
  today: "Today",
  "7d": "Last 7 days",
  "30d": "Last 30 days",
  "90d": "Last 90 days",
};

function toDateInput(date: Date) {
  return date.toISOString().slice(0, 10);
}

function getRangeDates(range: RangeKey) {
  const end = new Date();
  const start = new Date(end);
  const days = range === "today" ? 0 : Number(range.replace("d", "")) - 1;
  start.setDate(start.getDate() - days);
  return { startDate: toDateInput(start), endDate: toDateInput(end) };
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function dateValue(value: string | Date) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? new Date() : date;
}

export default function ExpensePage() {
  const [addExpenseOpen, setAddExpenseOpen] = useState(false);
  const [analysisTab, setAnalysisTab] = useState<AnalysisTab>("category");
  const [range, setRange] = useState<RangeKey>("today");
  const [customStart, setCustomStart] = useState(toDateInput(new Date()));
  const [customEnd, setCustomEnd] = useState(toDateInput(new Date()));
  const [customOpen, setCustomOpen] = useState(false);
  const { startDate, endDate } = useMemo(() => getRangeDates(range), [range]);
  const createExpense = useCreateExpense();
  const createCategory = useCreateCategory();
  const createTo = useCreateTo();
  const { data: categories = [] } = useGetCategories();
  const { data: toList = [] } = useGetToList();
  const activeStart = customOpen ? customStart : startDate;
  const activeEnd = customOpen ? customEnd : endDate;
  const {
    data: expenses = [],
    isLoading,
    isError,
    refetch,
  } = useGetExpenses(activeStart, activeEnd);

  const analytics = useMemo(() => {
    const categories = new Map<string, number>();
    const recipients = new Map<string, number>();
    const trend = new Map<string, number>();
    let cash = 0;
    let upi = 0;

    expenses.forEach((expense: Expense) => {
      const amount = Number(expense.cash || 0) + Number(expense.upi || 0);
      const category = expense.category || "Uncategorised";
      const recipient = expense.to || "Unassigned";
      const date = dateValue(expense.createdAt);
      categories.set(category, (categories.get(category) ?? 0) + amount);
      recipients.set(recipient, (recipients.get(recipient) ?? 0) + amount);
      trend.set(
        toDateInput(date),
        (trend.get(toDateInput(date)) ?? 0) + amount,
      );
      cash += Number(expense.cash || 0);
      upi += Number(expense.upi || 0);
    });

    const categoryRows = [...categories.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
    const recipientRows = [...recipients.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
    const trendRows = [...trend.entries()].sort(([a], [b]) =>
      a.localeCompare(b),
    );
    const total = cash + upi;
    return {
      cash,
      upi,
      total,
      categoryRows,
      recipientRows,
      trendRows,
    };
  }, [expenses]);

  const maxTrend = Math.max(
    ...analytics.trendRows.map(([, value]) => value),
    1,
  );
  const displayRange = customOpen
    ? `${activeStart} to ${activeEnd}`
    : rangeLabels[range];
  const paymentData = [
    { name: "UPI", value: analytics.upi, color: "#2563eb" },
    { name: "Cash", value: analytics.cash, color: "#10b981" },
  ];

  return (
    <div className="space-y-6 pb-10">
      <section className="flex flex-col justify-between gap-5 border-b border-slate-200 pb-6 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
            Financial control
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950">
            Expenses
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Track where money moves and spot the patterns early.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setAddExpenseOpen(true)}
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-blue-700 px-4 text-xs font-semibold text-white shadow-sm hover:bg-blue-800"
          >
            <Plus className="h-4 w-4" /> Add expense
          </button>
          <div className="flex items-center rounded-lg border border-slate-200 bg-white p-1 shadow-sm">
            {(Object.keys(rangeLabels) as RangeKey[]).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => {
                  setRange(key);
                  setCustomOpen(false);
                }}
                className={`rounded-md px-3 py-2 text-xs font-semibold transition-colors ${!customOpen && range === key ? "bg-slate-900 text-white" : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"}`}
              >
                {rangeLabels[key]}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setCustomOpen(!customOpen)}
            className={`inline-flex h-10 items-center gap-2 rounded-lg border px-3 text-xs font-semibold ${customOpen ? "border-blue-600 bg-blue-50 text-blue-700" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}`}
          >
            <CalendarDays className="h-4 w-4" /> Custom{" "}
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => refetch()}
            aria-label="Refresh expenses"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </section>

      <AddExpenseDialog
        open={addExpenseOpen}
        onOpenChange={setAddExpenseOpen}
        categories={categories}
        toList={toList}
        isCreatingCategory={createCategory.isPending}
        onCreateCategory={async (name) => {
          const response = await createCategory.mutateAsync(name);
          return response?.data ?? response;
        }}
        isCreatingTo={createTo.isPending}
        onCreateTo={async (name) => {
          const response = await createTo.mutateAsync(name);
          return response?.data ?? response;
        }}
        isSubmitting={createExpense.isPending}
        onSubmit={async (expense) => {
          await createExpense.mutateAsync(expense);
          setAddExpenseOpen(false);
          refetch();
        }}
      />

      {customOpen && (
        <section className="flex flex-wrap items-end gap-3 rounded-xl border border-blue-100 bg-blue-50/60 p-4">
          <label className="text-xs font-semibold text-slate-600">
            From
            <input
              type="date"
              value={customStart}
              onChange={(event) => setCustomStart(event.target.value)}
              className="mt-1 block h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800"
            />
          </label>
          <label className="text-xs font-semibold text-slate-600">
            To
            <input
              type="date"
              value={customEnd}
              onChange={(event) => setCustomEnd(event.target.value)}
              className="mt-1 block h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800"
            />
          </label>
        </section>
      )}

      {isError && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          We couldn&apos;t load expenses for this period. Try refreshing.
        </div>
      )}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {[
          {
            label: "Total spend",
            value: formatCurrency(analytics.total),
            detail: displayRange,
            icon: Wallet,
            tone: "bg-blue-50 text-blue-700",
          },
        ].map(({ label, value, detail, icon: Icon, tone }) => (
          <article
            key={label}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                {label}
              </p>
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-lg ${tone}`}
              >
                <Icon className="h-4 w-4" />
              </span>
            </div>
            <p className="mt-5 truncate text-2xl font-semibold tracking-tight text-slate-950">
              {value}
            </p>
            <p className="mt-1 truncate text-xs text-slate-500">{detail}</p>
          </article>
        ))}
        <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Top categories
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Highest spend in {displayRange.toLowerCase()}
              </p>
            </div>
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50 text-violet-700">
              <Banknote className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-4 space-y-3">
            {analytics.categoryRows.slice(0, 3).length ? (
              analytics.categoryRows
                .slice(0, 3)
                .map(([category, value], index) => (
                  <div key={category} className="flex items-center gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                      {index + 1}
                    </span>
                    <span className="min-w-0 flex-1 truncate text-sm font-medium text-slate-700">
                      {category}
                    </span>
                    <span className="shrink-0 text-sm font-semibold text-slate-950">
                      {formatCurrency(value)}
                    </span>
                  </div>
                ))
            ) : (
              <p className="py-3 text-sm text-slate-400">
                No category data yet.
              </p>
            )}
          </div>
        </article>
        <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Payment mix
              </p>
              <p className="mt-5 text-2xl font-semibold tracking-tight text-slate-950">
                {formatCurrency(analytics.total)}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                How expenses were settled
              </p>
            </div>
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
              <CreditCard className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-3 flex items-center gap-4">
            <div className="h-32 w-32 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={paymentData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={38}
                    outerRadius={58}
                    paddingAngle={3}
                    stroke="none"
                  >
                    {paymentData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => formatCurrency(Number(value))}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="min-w-0 flex-1 space-y-3">
              {paymentData.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between gap-2 text-xs"
                >
                  <span className="flex items-center gap-2 font-medium text-slate-600">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    {item.name}
                  </span>
                  <span className="font-semibold text-slate-900">
                    {formatCurrency(item.value)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </article>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="font-semibold text-slate-950">Expense ledger</h2>
              <p className="mt-1 text-xs text-slate-500">
                {expenses.length} records in this view
              </p>
            </div>
            <Link
              href="/admin/expense/ledger"
              className="text-xs font-semibold text-blue-700 hover:text-blue-900"
            >
              View all
            </Link>
          </div>
          {isLoading ? (
            <p className="p-5 text-sm text-slate-400">Loading expenses...</p>
          ) : expenses.length ? (
            <div className="divide-y divide-slate-100">
              {expenses.slice(0, 6).map((expense) => {
                const amount =
                  Number(expense.cash || 0) + Number(expense.upi || 0);
                return (
                  <div
                    key={expense.id}
                    className="flex items-center justify-between gap-4 px-5 py-4"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-slate-800">
                        {expense.description || expense.category || "Expense"}
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        {expense.category || "Uncategorised"} ·{" "}
                        {dateValue(expense.createdAt).toLocaleDateString(
                          "en-IN",
                          { day: "2-digit", month: "short", year: "numeric" },
                        )}
                      </p>
                    </div>
                    <p className="shrink-0 text-sm font-semibold text-slate-950">
                      {formatCurrency(amount)}
                    </p>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-8 text-center">
              <Receipt className="mx-auto h-8 w-8 text-slate-300" />
              <p className="mt-3 text-sm font-medium text-slate-600">
                No expenses recorded
              </p>
              <p className="mt-1 text-xs text-slate-400">
                There are no records for {displayRange.toLowerCase()}.
              </p>
            </div>
          )}
        </article>

        <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="font-semibold text-slate-950">Expense analysis</h2>
              <p className="mt-1 text-xs text-slate-500">
                Compare where the money is going
              </p>
            </div>
            <div
              className="flex rounded-lg border border-slate-200 bg-slate-50 p-1"
              role="tablist"
              aria-label="Expense analysis views"
            >
              {[
                ["category", "By category"],
                ["recipient", "By recipient"],
              ].map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={analysisTab === key}
                  onClick={() => setAnalysisTab(key as AnalysisTab)}
                  className={`rounded-md px-3 py-2 text-xs font-semibold transition-colors ${analysisTab === key ? "bg-white text-slate-950 shadow-sm" : "text-slate-500 hover:text-slate-900"}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-6 space-y-4">
            {(analysisTab === "category"
              ? analytics.categoryRows
              : analytics.recipientRows
            ).length ? (
              (analysisTab === "category"
                ? analytics.categoryRows
                : analytics.recipientRows
              ).map(([label, value]) => (
                <div key={label}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="max-w-[65%] truncate text-slate-700">
                      {label}
                    </span>
                    <span className="font-semibold text-slate-950">
                      {formatCurrency(value)}
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-100">
                    <div
                      className={`h-1.5 rounded-full ${analysisTab === "category" ? "bg-slate-900" : "bg-emerald-600"}`}
                      style={{
                        width: `${analytics.total ? (value / analytics.total) * 100 : 0}%`,
                      }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className="py-6 text-sm text-slate-400">
                No {analysisTab === "category" ? "category" : "recipient"} data
                yet.
              </p>
            )}
          </div>
        </article>
      </section>

      <section>
        <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="font-semibold text-slate-950">Spend trend</h2>
              <p className="mt-1 text-xs text-slate-500">
                Daily outflow across {displayRange.toLowerCase()}
              </p>
            </div>
            <Download className="h-4 w-4 text-slate-400" />
          </div>
          <div className="mt-8 flex h-48 items-end gap-2 overflow-x-auto border-b border-slate-100 pb-0">
            {isLoading ? (
              <div className="flex w-full items-center justify-center text-sm text-slate-400">
                Loading trend...
              </div>
            ) : analytics.trendRows.length ? (
              analytics.trendRows.map(([date, value]) => (
                <div
                  key={date}
                  className="group flex min-w-7 flex-1 flex-col items-center justify-end gap-2"
                >
                  <div
                    className="relative w-full max-w-10 rounded-t-md bg-blue-600 transition-all group-hover:bg-blue-700"
                    style={{
                      height: `${Math.max((value / maxTrend) * 100, 6)}%`,
                    }}
                    title={`${date}: ${formatCurrency(value)}`}
                  />
                  <span className="text-[10px] text-slate-400">
                    {new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                    })}
                  </span>
                </div>
              ))
            ) : (
              <div className="flex w-full items-center justify-center text-sm text-slate-400">
                No expenses in this period.
              </div>
            )}
          </div>
        </article>
      </section>
    </div>
  );
}

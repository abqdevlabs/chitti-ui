"use client";

import { useState } from "react";
import { Plus, Receipt } from "lucide-react";
import { Button } from "@app/components/ui/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@app/components/ui/dialog";
import { Input } from "@app/components/ui/input";
import { Label } from "@app/components/ui/label";
import { Category, CreateExpense, ToList } from "../types/expense";
import { ExpenseAmountFields } from "./ExpenseAmountFields";
import { ExpenseLookupField } from "./ExpenseLookupField";

interface AddExpenseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (expense: CreateExpense) => Promise<void>;
  categories: Category[];
  onCreateCategory: (name: string) => Promise<Category | undefined>;
  toList: ToList[];
  onCreateTo: (name: string) => Promise<ToList | undefined>;
  isSubmitting?: boolean;
  isCreatingCategory?: boolean;
  isCreatingTo?: boolean;
}

const initialForm: CreateExpense = {
  categoryId: "",
  description: "",
  upi: 0,
  cash: 0,
  to: "",
};

export function AddExpenseDialog({
  open,
  onOpenChange,
  onSubmit,
  categories,
  onCreateCategory,
  toList,
  onCreateTo,
  isSubmitting = false,
  isCreatingCategory = false,
  isCreatingTo = false,
}: AddExpenseDialogProps) {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");

  const updateField = <K extends keyof CreateExpense>(
    field: K,
    value: CreateExpense[K],
  ) => setForm((current) => ({ ...current, [field]: value }));

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen && !isSubmitting) {
      setForm(initialForm);
      setError("");
    }
    onOpenChange(nextOpen);
  };

  const selectCategory = (category: Category) =>
    updateField("categoryId", category.id);
  const selectRecipient = (recipient: ToList) => {
    updateField("toId", recipient.id || undefined);
    updateField("to", recipient.name);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const total = Number(form.cash || 0) + Number(form.upi || 0);

    if (!form.categoryId.trim() || !form.to?.trim()) {
      setError("Add a category and recipient before saving.");
      return;
    }
    if (total <= 0) {
      setError("Enter an amount greater than zero.");
      return;
    }

    setError("");
    await onSubmit({
      ...form,
      categoryId: form.categoryId.trim(),
      description: form.description?.trim() || null,
      toId: form.toId || undefined,
      to: form.toId ? undefined : form.to.trim(),
      cash: Number(form.cash || 0),
      upi: Number(form.upi || 0),
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-lg rounded-2xl p-0">
        <DialogHeader className="border-b border-slate-100 px-6 py-5">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
              <Receipt className="h-5 w-5" />
            </span>
            <div>
              <DialogTitle className="text-lg font-semibold text-slate-950">
                Add expense
              </DialogTitle>
              <DialogDescription className="mt-1 text-xs">
                Record a payment and keep your ledger current.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-5 px-6 py-6">
            <div className="grid gap-5 sm:grid-cols-2">
              <ExpenseLookupField
                id="expense-category-search"
                label="Category"
                placeholder="Search categories"
                createLabel="Create new category"
                items={categories}
                value={form.categoryId}
                onSelect={selectCategory}
                onCreate={onCreateCategory}
                isCreating={isCreatingCategory}
              />
              <ExpenseLookupField
                id="expense-to"
                label="Paid to"
                placeholder="Search recipients"
                createLabel="Create new recipient"
                items={toList}
                value={form.to ?? ""}
                valueType="name"
                allowCreate={false}
                onSelect={selectRecipient}
                onCreate={onCreateTo}
                isCreating={isCreatingTo}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="expense-description">
                Description{" "}
                <span className="font-normal text-slate-400">(optional)</span>
              </Label>
              <Input
                id="expense-description"
                value={form.description ?? ""}
                onChange={(event) =>
                  updateField("description", event.target.value)
                }
                placeholder="What was this expense for?"
              />
            </div>

            <ExpenseAmountFields
              cash={form.cash}
              upi={form.upi}
              onCashChange={(value) => updateField("cash", value)}
              onUpiChange={(value) => updateField("upi", value)}
            />

            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
              <span className="text-sm font-medium text-slate-600">
                Total expense
              </span>
              <span className="text-lg font-semibold text-slate-950">
                ₹
                {(
                  Number(form.cash || 0) + Number(form.upi || 0)
                ).toLocaleString("en-IN")}
              </span>
            </div>
            {error && (
              <p role="alert" className="text-sm text-red-600">
                {error}
              </p>
            )}
          </div>

          <DialogFooter className="border-t border-slate-100 px-6 py-4 sm:justify-end">
            <DialogClose
              render={
                <Button type="button" variant="outline" disabled={isSubmitting}>
                  Cancel
                </Button>
              }
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                "Saving..."
              ) : (
                <>
                  <Plus data-icon="inline-start" /> Save expense
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

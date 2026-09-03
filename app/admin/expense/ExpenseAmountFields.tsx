"use client";

import { Input } from "@app/components/ui/input";
import { Label } from "@app/components/ui/label";

interface ExpenseAmountFieldsProps {
  cash: number;
  upi: number;
  onCashChange: (value: number) => void;
  onUpiChange: (value: number) => void;
}

export function ExpenseAmountFields({
  cash,
  upi,
  onCashChange,
  onUpiChange,
}: ExpenseAmountFieldsProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <div className="grid gap-2">
        <Label htmlFor="expense-cash">Cash amount</Label>
        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
            ₹
          </span>
          <Input
            id="expense-cash"
            type="number"
            min="0"
            step="0.01"
            value={cash || ""}
            onChange={(event) => onCashChange(Number(event.target.value))}
            className="pl-7"
            placeholder="0"
          />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="expense-upi">UPI amount</Label>
        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
            ₹
          </span>
          <Input
            id="expense-upi"
            type="number"
            min="0"
            step="0.01"
            value={upi || ""}
            onChange={(event) => onUpiChange(Number(event.target.value))}
            className="pl-7"
            placeholder="0"
          />
        </div>
      </div>
    </div>
  );
}

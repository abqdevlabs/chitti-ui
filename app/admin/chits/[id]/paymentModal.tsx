import React, { useState } from "react";
import { X, User } from "lucide-react";
import { ChitMembers, ChitPayments } from "@/admin/types/chit.type";

// Sample Members Data
export interface AddPaymentPayload {
  payId: string;
  upi: number;
  cash: number;
  toPay: number;

  paymentDate: string;
  notes: string;
}
export function RecordPaymentModal({
  payments,
  members,
  isOpen = true,
  onClose,
  installment,
  onSave,
}: {
  payments: ChitPayments[];
  members: ChitMembers[];
  isOpen: boolean;
  onClose: () => void;
  installment: string;
  onSave: (data: AddPaymentPayload) => void;
}) {
  const [selectedMemberId, setSelectedMemberId] = useState(members[0].id);
  const [upiAmount, setUpiAmount] = useState("");
  const [cashAmount, setCashAmount] = useState("");
  const [paymentDate, setPaymentDate] = useState("2026-07-21");
  const [notes, setNotes] = useState("");

  if (!isOpen) return null;

  // Find selected member details
  const selectedMember =
    members.find((m) => m.id === selectedMemberId) || members[0];

  // Calculate total dynamically
  const totalAmount =
    (parseFloat(upiAmount) || 0) + (parseFloat(cashAmount) || 0);
  const toPay =
    payments?.find((a) => a.memberId === selectedMember.id)?.net ?? 0;
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      memberId: selectedMember.id,
      upi: parseFloat(upiAmount) || 0,
      cash: parseFloat(cashAmount) || 0,
      toPay: payments?.find((a) => a.memberId === selectedMember.id)?.net ?? 0,
      payId:
        payments?.find((a) => a.memberId === selectedMember.id)?.pay_id ?? "",

      paymentDate,
      notes,
    };
    onSave(payload);

    if (onClose) onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div
        className="  w-full
    h-dvh sm:h-auto
    sm:max-h-[90vh]
    max-w-2xl
    bg-card
    rounded-none
    sm:rounded-2xl
    shadow-2xl
    border-0
    sm:border
    border-border
    flex
    flex-col
    overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-border flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold leading-none">
              Record Payment
            </h2>
            <p className="text-sm text-text-secondary">
              Transaction Ref:{" "}
              <span className="text-primary font-medium">#CFT-88219</span>
            </p>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="p-2 rounded-full text-text-secondary hover:bg-muted hover:text-text-primary transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Form Body */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col flex-1 overflow-hidden"
        >
          <div
            className=" flex-1
    overflow-y-auto
    p-4
    sm:p-6
    lg:p-8
    flex
    flex-col
    gap-5"
          >
            {/* Member Selection Dropdown */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-text-secondary">
                Select Member
              </label>
              <div className="relative">
                <select
                  value={selectedMemberId}
                  onChange={(e) => setSelectedMemberId(e.target.value)}
                  className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none appearance-none cursor-pointer text-base font-medium"
                >
                  {members.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.name} ({member.phone})
                    </option>
                  ))}
                </select>
                <User className="absolute right-4 top-3.5 size-5 text-text-secondary pointer-events-none" />
              </div>
            </div>

            {/* Selected Member Details Card */}
            <div className="p-4 bg-muted/40 rounded-xl border border-border flex items-center gap-4">
              <div className="size-12 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold text-lg rounded-full flex items-center justify-center shrink-0"></div>
              <div className="grid grid-cols-3 gap-4 flex-1 text-xs">
                <div>
                  <span className="block font-bold uppercase tracking-wider text-text-secondary text-[10px]">
                    Member
                  </span>
                  <span className="text-sm font-semibold truncate block">
                    {selectedMember.name}
                  </span>
                </div>
                <div>
                  <span className="block font-bold uppercase tracking-wider text-text-secondary text-[10px]">
                    ID
                  </span>
                  <span className="text-sm font-semibold">
                    {selectedMember.phone}
                  </span>
                </div>
                <div>
                  <span className="block font-bold uppercase tracking-wider text-text-secondary text-[10px]">
                    Installment
                  </span>
                  <span className="text-sm font-semibold">{installment}</span>
                </div>
                <div>
                  <span className="block font-bold uppercase tracking-wider text-text-secondary text-[10px]">
                    To Pay
                  </span>
                  <span className="text-sm font-semibold">
                    {toPay.toLocaleString("en-IN", {
                      currency: "INR",
                      style: "currency",
                      maximumFractionDigits: 0,
                    })}
                  </span>
                </div>
              </div>
            </div>

            {/* Amounts Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* UPI Amount */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-text-secondary">
                  Amount (UPI)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-text-secondary font-semibold">
                    ₹
                  </span>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={upiAmount}
                    onChange={(e) => setUpiAmount(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 bg-muted/50 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none text-base font-semibold"
                  />
                </div>
              </div>

              {/* Cash Amount */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-text-secondary">
                  Amount (Cash)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-text-secondary font-semibold">
                    ₹
                  </span>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={cashAmount}
                    onChange={(e) => setCashAmount(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 bg-muted/50 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none text-base font-semibold"
                  />
                </div>
              </div>
            </div>

            {/* Payment Date */}
            <div className="flex flex-col gap-1.5 sm:w-1/2">
              <label className="text-sm font-medium text-text-secondary">
                Payment Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={paymentDate}
                  onChange={(e) => setPaymentDate(e.target.value)}
                  className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none text-base"
                />
              </div>
            </div>

            {/* Notes */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-text-secondary">
                Transaction Notes / Remarks
              </label>
              <textarea
                rows={3}
                placeholder="Add any special instructions or member requests..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-4 bg-muted/50 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none text-sm resize-none"
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-6 md:p-8 bg-muted/30 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex flex-col items-start w-full sm:w-auto">
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                Total Amount To Record
              </span>
              <span className="text-xl font-bold text-primary">
                ₹
                {totalAmount.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 rounded-xl border border-border font-semibold hover:bg-muted transition-colors w-full sm:w-auto"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-md w-full sm:w-auto"
              >
                Confirm Receipt
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

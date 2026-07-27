"use client";
import { Button } from "@/components/ui/Button";
import { ReusableDataTable } from "@/components/ui/data-table";
import {
  Check,
  ChevronDown,
  Clock,
  Gavel,
  Percent,
  Plus,
  Trophy,
  Wallet,
} from "lucide-react";
import { useParams } from "next/navigation";
import { RecordPaymentModal } from "./paymentModal";
import { useEffect, useRef, useState } from "react";
import {
  useCreateAuctionWinner,
  useCreatePayment,
  useGetChitData,
  useGetChitInstallments,
  useGetChitMembers,
} from "@/admin/hooks/chit.hooks";
import { AuctionModal } from "./auctionModal";
import {
  ChitInstallement,
  ChitMembers,
  ChitPayments,
} from "@/admin/types/chit.type";
import { CardFormData, ShareCardModal } from "./CardForm";

export default function ChitDetail() {
  const columns = [
    {
      accessorKey: "name",
      header: "Name",
    },

    {
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey: "due_amt",
      header: "Month Due",
    },
    {
      accessorKey: "discount_amt",
      header: "Discount",
    },
    {
      accessorKey: "net",
      header: "To Pay",
    },
    {
      accessorKey: "upi",
      header: "UPI",
    },
    {
      accessorKey: "cash",
      header: "Cash",
    },
  ];

  const [open, setOpen] = useState(false); // Fixed 'isOpen' setter name as well
  const [auctionOpen, setAuctionOpen] = useState(false);

  const params = useParams<{ id: string }>();
  const chitId = params.id;

  // Fetch data
  const { data: installments, isLoading: installmentsLoading } =
    useGetChitInstallments(chitId);
  const { data: chitMembers, isLoading: chitMembersLoading } =
    useGetChitMembers(chitId ?? "");
  const { mutate } = useCreateAuctionWinner();
  const { mutate: CreatePayment } = useCreatePayment();
  console.log(installments);
  // Initialize empty
  const [selectedInstallmentId, setSelectedInstallmentId] = useState<
    string | null
  >(null);
  // Sync state when installments arrive
  const defaultInstallment = installments?.find(
    (item) => item?.isDefault || item?.isDefault,
  );

  const installmentId = selectedInstallmentId ?? defaultInstallment?.id;
  const [payment, setPayment] = useState<CardFormData>();

  const [view, setView] = useState(false);

  // Enabled query automatically waits until installmentId is non-empty
  const { data, isLoading } = useGetChitData(chitId, installmentId ?? "");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  // Close cycle dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  // Compute selected installment item
  const selectedInstallment = installments?.find(
    (item: ChitInstallement) =>
      item.id === (selectedInstallmentId || data?.installmentId),
  );

  // Helper for INR currency formatting
  const formatCurrency = (val?: number | null) => {
    if (val === null || val === undefined) return "₹0";
    return val.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    });
  };

  const paidCount =
    data?.payments?.filter((a: ChitPayments) => a.status === "paid").length ??
    0;
  const dueCount =
    data?.payments?.filter((a: ChitPayments) => a.status === "due").length ?? 0;
  const totalPaymentsAmount = (data?.paidUPI ?? 0) + (data?.paidCash ?? 0);
  function onView(dat: ChitPayments) {
    const da = {
      name: data?.name ?? "",
      member_name: dat.member_name,
      groupNo: data?.installments ?? "",
      cycleNo: data?.installments ?? "",
      date: new Date().toISOString(),
      auction_amt:
        data?.auction_winner === null ? "0" : formatCurrency(data?.auction_amt),
      auction_winner:
        data?.auction_winner === null
          ? "No Winner"
          : (data?.auction_winner ?? "N/A"),
      time: "9 AM",
      total: (data?.toPay ?? 0).toLocaleString("en-IN"),
      phone: "7010497689",
      auctioned: (data?.auction_amt ?? 0).toLocaleString("en-IN"),
      due: (dat.net ?? 0).toLocaleString("en-IN"),
      discount: (dat.discount_amt ?? 0).toLocaleString("en-IN"),
    };
    setPayment(da);
    setView(true);
  }
  const unPaidId = data?.payments
    .filter((a) => a.status != "paid")
    .map((s) => s.memberId);

  const dueMembersSet = new Set(unPaidId);
  console.log("INSTLMENT ID", installmentId);
  // 2. Filter chitMembers to get only matching user objects
  const presentMembers =
    chitMembers?.filter(
      (member) => dueMembersSet.has(member.id), // Replace 'id' with your property name (e.g. memberId, userId)
    ) ?? [];

  if (isLoading || chitMembersLoading || installmentsLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 pb-24 md:pb-8">
      {/* Modals */}
      {view && payment && (
        <div>
          <ShareCardModal
            isOpen={view}
            onClose={() => setView(false)}
            formData={payment}
          />
        </div>
      )}
      <RecordPaymentModal
        installment={data?.installments ?? ""}
        payments={data?.payments ?? []}
        members={presentMembers ?? []}
        isOpen={open}
        onClose={() => setOpen(false)}
        onSave={(data) => {
          CreatePayment({ data, chitId, installmentId: installmentId ?? "" });
        }}
      />
      <AuctionModal
        chitId={data?.id ?? ""}
        installmentId={data?.installmentId ?? ""}
        installment={data?.installments ?? ""}
        members={
          chitMembers?.filter((a: ChitMembers) => a.auctioned === false) ?? []
        }
        isOpen={auctionOpen}
        onClose={() => setAuctionOpen(false)}
        onSave={(formData: {
          memberId: string;
          amt: number;
          installmentId: string;
          chitId: string;
          date: string;
        }) => mutate(formData)}
      />

      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4 border-b border-border">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
              {data?.name || "Chit Details"}
            </h1>
          </div>
          <p className="text-sm text-text-secondary">
            Manage installments, track payments, and record monthly auctions.
          </p>
        </div>

        {/* Action Controls & Cycle Selector */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Cycle Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="bg-card border border-border px-3.5 py-2 rounded-xl inline-flex items-center gap-3 shadow-xs hover:bg-dim/50 transition-colors cursor-pointer"
            >
              <div className="text-left">
                <p className="text-[10px] font-semibold text-text-secondary uppercase tracking-wider">
                  Current Cycle
                </p>
                <p className="text-sm font-bold text-text-primary">
                  {selectedInstallment
                    ? `${selectedInstallment.month} ${selectedInstallment.year}`
                    : "Select Cycle"}
                </p>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-text-secondary transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-xl shadow-xl z-50 py-1.5 max-h-64 overflow-y-auto">
                <div className="px-3 py-1.5 text-[11px] font-semibold text-text-secondary uppercase tracking-wider border-b border-border/50">
                  Select Installment
                </div>
                {installments?.map((item: ChitInstallement) => {
                  const isSelected = item.id === selectedInstallment?.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setSelectedInstallmentId(item.id);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full px-3 py-2 text-left text-sm flex items-center justify-between transition-colors ${
                        isSelected
                          ? "bg-primary/10 text-primary font-medium"
                          : "hover:bg-dim text-text-primary"
                      }`}
                    >
                      <span>
                        {item.month} {item.year}
                      </span>
                      {isSelected && <Check className="w-4 h-4 text-primary" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Desktop Auction Button */}
          {data?.auction_winner === null && (
            <button
              onClick={() => setAuctionOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl border border-border bg-card hover:bg-dim transition-colors shadow-xs"
            >
              <Gavel className="w-4 h-4 text-primary" />
              <span>Add Auction</span>
            </button>
          )}

          {/* Desktop Record Payment Button */}
          <Button onClick={() => setOpen(true)}>
            <Plus className="w-4 h-4" />
            <span>Record Payment</span>
          </Button>
        </div>
      </div>

      {/* 2. Key Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {/* Payments Card */}
        <div className="p-5 bg-card rounded-2xl border border-border shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Payments
              </span>
              <Wallet className="w-4 h-4 text-text-secondary" />
            </div>
            <p className="text-2xl font-bold tracking-tight text-text-primary">
              {formatCurrency(totalPaymentsAmount)}
            </p>
            <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-1">
              {paidCount} MEMBERS PAID
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-border/60 space-y-1.5 text-xs">
            <div className="flex justify-between items-center text-text-secondary">
              <span>UPI</span>
              <span className="font-semibold text-text-primary">
                {formatCurrency(data?.paidUPI ?? 0)}
              </span>
            </div>
            <div className="flex justify-between items-center text-text-secondary">
              <span>Cash</span>
              <span className="font-semibold text-text-primary">
                {formatCurrency(data?.paidCash ?? 0)}
              </span>
            </div>
          </div>
        </div>

        {/* Pending Payments Card */}
        <div className="p-5 bg-card rounded-2xl border border-border shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Pending Payments
              </span>
              <Clock className="w-4 h-4 text-text-secondary" />
            </div>
            <p className="text-2xl font-bold tracking-tight text-text-primary">
              {formatCurrency(data?.toPay ?? 0)}
            </p>
          </div>
          <p className="text-xs font-semibold text-rose-500 mt-2">
            {dueCount} MEMBERS OVERDUE
          </p>
        </div>

        {/* Auction Amount Card */}
        <div className="p-5 bg-card rounded-2xl border border-border shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Auction Amount
              </span>

              <Gavel className="w-4 h-4 text-text-secondary" />
            </div>
            <p className="text-2xl font-bold tracking-tight text-text-primary">
              {data?.auction_winner === null
                ? "No Auction"
                : formatCurrency(data?.auction_amt)}
            </p>
          </div>
        </div>

        {/* Auction Winner Card */}
        <div className="p-5 bg-card rounded-2xl border border-border shadow-xs flex flex-col justify-between h-full">
          <div>
            {/* Header: Label + Icon */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Auction Winner
              </span>
              <Trophy className="w-4 h-4 text-text-secondary" />
            </div>

            {/* Winner Name */}
            <p className="text-2xl font-bold tracking-tight text-text-primary truncate mb-1">
              {data?.auction_winner === null
                ? "No Winner"
                : (data?.auction_winner ?? "N/A")}
            </p>

            {/* Winning Amount / Payout */}
            <p className="text-sm font-semibold text-text-secondary">
              Amount:{" "}
              <span className="text-text-primary font-bold">
                {formatCurrency((data?.toPay ?? 0) - (data?.auction_amt ?? 0))}
              </span>
            </p>
          </div>
        </div>

        {/* Discount Amount Card */}
        <div className="p-5 bg-card rounded-2xl border border-border shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Dividend / Discount
              </span>
              <Percent className="w-4 h-4 text-text-secondary" />
            </div>
            <p className="text-2xl font-bold tracking-tight text-text-primary">
              {data?.auction_winner === null
                ? "N/A"
                : formatCurrency(data?.discount_amt)}
            </p>
          </div>
        </div>
      </div>

      {/* 3. Members Data Table Section */}
      <div className="bg-card rounded-2xl border border-border shadow-xs p-4 sm:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-text-primary">Member Status</h2>
          <span className="text-xs font-medium px-2.5 py-1 bg-dim rounded-full text-text-secondary">
            {chitMembers?.length ?? 0} Total Members
          </span>
        </div>

        <ReusableDataTable
          data={data?.payments ?? []}
          columns={columns}
          searchKey="name"
          searchPlaceholder="Filter users by name..."
          onEdit={(data) => onView(data)}
        />
      </div>

      {/* Mobile Sticky Bottom Floating Action Bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 p-4 bg-card/80 backdrop-blur-md border-t border-border z-40 flex items-center gap-3">
        {data?.auction_winner === null && (
          <button
            onClick={() => setAuctionOpen(true)}
            className="flex-1 py-3 px-4 rounded-xl border border-border bg-card font-semibold text-sm flex items-center justify-center gap-2"
          >
            <Gavel className="w-4 h-4 text-primary" />
            <span>Auction</span>
          </button>
        )}
        <button
          onClick={() => setOpen(true)}
          className="flex-1 py-3 px-4 rounded-xl bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Add Payment</span>
        </button>
      </div>
    </div>
  );
}

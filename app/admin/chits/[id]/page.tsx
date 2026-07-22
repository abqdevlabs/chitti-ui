"use client";
import { Button } from "@/components/ui/Button";
import { ReusableDataTable } from "@/components/ui/data-table";
import { ChevronDown } from "lucide-react";
import { useParams } from "next/navigation";
import { RecordPaymentModal } from "./paymentModal";
import { useState } from "react";
import { useGetChitData, useGetChitMembers } from "@/admin/hooks/chit.hooks";
import { AuctionModal } from "./auctionModal";

export default function ChitDetail() {
  const columns = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "id",
      header: "Id",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey: "amount",
      header: "Amount Due",
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

  const sampleData = [
    {
      id: "PAY-1001",
      name: "Ananya Sharma",
      status: "Paid",
      amount: "₹10,000",
      upi: "1000",
      cash: "2000",
    },

    {
      id: "PAY-1002",
      name: "Rohan Varma",
      status: "Overdue",
      amount: "₹25,500",
      upi: "1000",
      cash: "2000",
    },
    {
      id: "PAY-1003",
      name: "Priya Nair",
      status: "Pending",
      amount: "₹15,000",
      upi: "1000",
      cash: "2000",
    },
    {
      id: "PAY-1004",
      name: "Vikram Sengupta",
      status: "Paid",
      amount: "₹8,200",
      upi: "1000",
      cash: "2000",
    },
    {
      id: "PAY-1005",
      name: "Deepak Patel",
      status: "Overdue",
      amount: "₹12,400",
      upi: "1000",
      cash: "2000",
    },
  ];

  const [open, isOpen] = useState(false);
  const [auctionOpen, setAuctionOpen] = useState(false);

  const params = useParams<{ id: string }>();
  const chitId = params.id;

  // Only runs when chitId is defined
  const { data, isLoading } = useGetChitData(chitId ?? "");
  const { data: chitMembers, isLoading: chitMembersLoading } =
    useGetChitMembers(chitId ?? "");
  if (isLoading || chitMembersLoading) {
    return <div> Loading...</div>;
  }
  console.log("CHITMEM", chitMembers);
  return (
    <div>
      <RecordPaymentModal
        installment={data?.installments ?? ""}
        members={chitMembers ?? []}
        isOpen={open}
        onClose={() => isOpen(false)}
      />
      <AuctionModal
        installment={data?.installments ?? ""}
        members={chitMembers?.filter((a) => a.auctioned === false) ?? []}
        isOpen={auctionOpen}
        onClose={() => setAuctionOpen(false)}
      />
      <h1 className="text-3xl font-semibold leading-10 font-inter">
        {data?.name}
      </h1>
      {data?.auction_winner === null && (
        <Button
          className="rounded"
          variant="outline"
          onClick={() => setAuctionOpen(true)}
        >
          Add Auction
        </Button>
      )}

      <div className=" bg-[#F2F4F6]  px-4 py-2 justify-start inline-flex rounded-lg  ">
        <div className="bg-white  px-4 py-2 rounded-xl inline-flex flex-col justify-start">
          <p className="text-gray-500 text-xs font-medium uppercase leading-4 tracking-wide">
            {" "}
            Current Cycle
          </p>
          <div className="flex flex-row items-center gap-2">
            <p className=" text-xl font-semibold leading-7"> June 2026</p>
            <ChevronDown />
          </div>
        </div>
        <div className=" px-4 py-2 rounded-xl inline-flex flex-col justify-start">
          <p className="text-gray-500 text-xs font-medium uppercase leading-4 tracking-wide">
            {" "}
            Installments
          </p>
          <p className=" text-xl font-semibold leading-7">
            {data?.installments}
          </p>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {/* 1. Payments Card with Breakdown */}
        <div className="p-6 bg-card flex flex-col gap-2 rounded-xl shadow-custom-sm border border-border">
          <p className="text-text-secondary text-sm font-medium">Payments</p>
          <p className="text-2xl font-semibold tracking-tight text-text-primary">
            {(data?.paidUPI ?? 0) + (data?.paidCash ?? 0)}
          </p>
          <p className="text-xs uppercase text-green-500 tracking-wide font-medium">
            {data?.payments.filter((a) => a.status === "paid").length} MEMBERS
            PAID
          </p>

          {/* Breakdown Divider & Details */}
          <div className="mt-2 pt-3 border-t border-border flex flex-col gap-1 text-xs text-text-secondary">
            <div className="flex justify-between items-center">
              <span>UPI</span>
              <span className="font-medium text-text-primary">
                {data?.paidUPI ?? 0}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>Cash</span>
              <span className="font-medium text-text-primary">
                {data?.paidCash ?? 0}
              </span>
            </div>
          </div>
        </div>

        {/* 2. Pending Payments */}
        <div className="p-6 bg-card flex flex-col gap-2 rounded-xl shadow-custom-sm border border-border">
          <p className="text-text-secondary text-sm font-medium">
            Pending Payments
          </p>
          <p className="text-2xl font-semibold tracking-tight text-text-primary">
            {data?.toPay.toLocaleString("en-IN", {
              style: "currency",
              currency: "INR",
              maximumFractionDigits: 0,
            }) ?? 0}
          </p>
          <p className="text-xs uppercase text-error tracking-wide font-medium">
            {data?.payments.filter((a) => a.status === "due").length} MEMBERS
            OVERDUE
          </p>
        </div>

        {/* 3. Auction Amount */}
        <div className="p-6 bg-card flex flex-col gap-2 rounded-xl shadow-custom-sm border border-border">
          <p className="text-text-secondary text-sm font-medium">
            Auction Amount
          </p>
          <p className="text-2xl font-semibold tracking-tight text-text-primary">
            {data?.auction_winner === null
              ? "No Auction"
              : (data?.auction_amt ?? 0)}
          </p>
        </div>

        {/* 4. Auction Winner */}
        <div className="p-6 bg-card flex flex-col gap-2 rounded-xl shadow-custom-sm border border-border">
          <p className="text-text-secondary text-sm font-medium">
            Auction Winner
          </p>
          <p className="text-2xl font-semibold tracking-tight text-text-primary">
            {data?.auction_winner === null
              ? "No Auction"
              : (data?.auction_winner ?? null)}
          </p>
        </div>

        {/* 5. Discount Amount */}
        <div className="p-6 bg-card flex flex-col gap-2 rounded-xl shadow-custom-sm border border-border">
          <p className="text-text-secondary text-sm font-medium">
            Discount Amount
          </p>
          <p className="text-2xl font-semibold tracking-tight text-text-primary">
            {data?.auction_winner === null
              ? "No Auction"
              : (data?.discount_amt ?? null)}
          </p>
        </div>
      </div>
      <div>
        <Button onClick={() => isOpen(true)}>Add Payment</Button>
        <ReusableDataTable
          title="Chits"
          data={sampleData ?? []}
          columns={columns}
          searchKey="name"
          searchPlaceholder="Filter users by name..."
        />
      </div>
    </div>
  );
}

import { MemberList } from "./member.type";

export interface AddChit {
  name: string;
  total: number;
  monthly: number;
  members: number;
  duration: number;
  durationUnit: "month";
  commission: number;
  membersId: string[];
  startMonth: string;
  startYear: number;
  paymentDay: number;
  auctionDay: number;
}

export interface ChitList {
  id: string;
  name: string;
  monthly: string;
  total: string;
  members: MemberList[];
}

export interface ChitData {
  id: string | null;
  name: string | null;
  paid: number | null;
  installments: string;
  installmentId: string;
  paid_members?: {
    name: string;
    upi: number;
    cash: number;
  }[];
  due_members?: {
    name: string;
    amount: number;
  }[];
  auction_amt: number;
  auction_winner: string;
  discount_amt: number;
  paidUPI: number;
  paidCash: number;
  toPay: number;
  payments: ChitPayments[];
}

export interface ChitPayments {
  id: string;
  pay_id: string;
  status: string;
  due_amt: number;
  upi: number;
  cash: number;
  name: string;
}

export interface ChitMembers {
  id: string;
  name: string;
  phone: string;
  auctioned: boolean;
}

export interface ChitInstallement {
  id: string;
  month: string;
  year: number;
  short: string;
  isDefault: boolean;
}

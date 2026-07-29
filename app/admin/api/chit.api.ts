import { api } from "@app/api";
import {
  AddChit,
  ChitData,
  ChitInstallement,
  ChitMembers,
} from "../types/chit.type";
import { AddPaymentPayload } from "../chits/[id]/paymentModal";

export async function CreateChit(data: AddChit) {
  try {
    const res = await api.post("/chit", data);
    return res.data;
  } catch {}
}

export async function GetChitList() {
  try {
    const res = await api.get("/chit/list");
    return res.data;
  } catch {}
}

export async function GetChitData(id: string, installmentId: string) {
  try {
    const res = await api.get<ChitData>("/chit", {
      params: { id, installmentId },
    });
    return res.data;
  } catch {}
}

export async function GetChitMembers(id: string) {
  try {
    const res = await api.get<ChitMembers[]>("/chit/list/chit-members", {
      params: { id },
    });
    return res.data;
  } catch {}
}

export async function GetChitInstallements(id: string) {
  try {
    const res = await api.get<ChitInstallement[]>("/chit/installments", {
      params: { id },
    });
    return res.data;
  } catch {}
}

export async function CreateAuctionWinner(data: {
  memberId: string;
  amt: number;
  installmentId: string;
  chitId: string;
}) {
  try {
    const res = await api.post("/chit/auction/winner", data);
    return res.data;
  } catch {}
}

export async function CreatePayment(data: AddPaymentPayload) {
  try {
    const res = await api.post("/chit/payment", data);
    return res.data;
  } catch {}
}

import { api } from "@app/api";
import { AddChit, ChitData, ChitMembers } from "../types/chit.type";

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

export async function GetChitData(id: string) {
  try {
    const res = await api.get<ChitData>("/chit", { params: { id } });
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

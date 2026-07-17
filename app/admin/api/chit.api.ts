import { api } from "@app/api";
import { AddChit } from "../types/chit.type";

export async function CreateChit(data: AddChit) {
  try {
    const res = await api.post("/chit", data);
    return res.data;
  } catch {}
}

import { api } from "@/api";
import { Category, ToList, type CreateExpense } from "../types/expense";

export async function CreateExpense(data: CreateExpense) {
  try {
    const res = await api.post("/expense", data);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function GetExpense(startDate?: string, endDate?: string) {
  try {
    const res = await api.get("/expense", {
      params: { startDate, endDate },
    });
    return res.data;
  } catch {}
}

export async function GetCategory() {
  try {
    const res = await api.get<Category[]>("/expense/category");
    return res.data;
  } catch {}
}

export async function GetToList() {
  try {
    const res = await api.get<ToList[]>("/expense/to");
    return res.data;
  } catch {}
}

export async function CreateTo(name: string) {
  try {
    const res = await api.post("/expense/to", { name });
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function CreateCategory(name: string) {
  try {
    const res = await api.post("/expense/category", { name });
    return res.data;
  } catch (error) {
    throw error;
  }
}

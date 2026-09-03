import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CreateCategory,
  CreateExpense as createExpense,
  CreateTo,
  GetCategory,
  GetExpense,
  GetToList,
} from "../api/expense.api";
import { Category, CreateExpense, Expense, ToList } from "../types/expense";

export function useGetExpenses(startDate: string, endDate: string) {
  return useQuery<Expense[], Error>({
    queryKey: ["expenses", startDate, endDate],
    queryFn: async () => {
      const response = await GetExpense(startDate, endDate);
      return Array.isArray(response) ? response : (response?.data ?? []);
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useCreateExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (expense: CreateExpense) => createExpense(expense),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });
}

export function useGetCategories() {
  return useQuery<Category[], Error>({
    queryKey: ["expense-categories"],
    queryFn: async () => {
      const response = await GetCategory();
      return Array.isArray(response) ? response : (response ?? []);
    },
    staleTime: 1000 * 60 * 10,
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (name: string) => CreateCategory(name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expense-categories"] });
    },
  });
}

export function useGetToList() {
  return useQuery<ToList[], Error>({
    queryKey: ["expense-to-list"],
    queryFn: async () => {
      const response = await GetToList();
      return Array.isArray(response) ? response : (response ?? []);
    },
    staleTime: 1000 * 60 * 10,
  });
}

export function useCreateTo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (name: string) => CreateTo(name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expense-to-list"] });
    },
  });
}

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AddChit, ChitList } from "../types/chit.type";
import {
  ChangeChitOrder,
  CreateAuctionWinner,
  CreateChit,
  CreatePayment,
  GetChitData,
  GetChitInstallements,
  GetChitList,
  GetChitMembers,
} from "../api/chit.api";
import { AddPaymentPayload } from "../chits/[id]/paymentModal";

export function useCreateChit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AddChit) => CreateChit(data),

    // Optional: Refresh your lists automatically after a successful creation
    onSuccess: async () => {
      // Assuming you have a query list like ['chits']
      await queryClient.invalidateQueries({ queryKey: ["chits"] });
    },

    onError: (error) => {
      console.error("Failed to create chit:", error);
    },
  });
}
export function useChangeChitOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, order }: { id: string; order: number }) =>
      ChangeChitOrder(id, order),

    // Optional: Refresh your lists automatically after a successful creation
    onSuccess: async () => {
      // Assuming you have a query list slike ['chits']
      await queryClient.invalidateQueries({ queryKey: ["chits"] });
    },

    onError: (error) => {
      console.error("Failed to create chit:", error);
    },
  });
}

export function useCreateAuctionWinner() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      memberId: string;
      amt: number;
      installmentId: string;
      chitId: string;
    }) => CreateAuctionWinner(data),

    // Pass 'data' as the second argument here
    onSuccess: (_, data) => {
      queryClient.invalidateQueries({ queryKey: ["chit", data.chitId] });
    },

    onError: (error) => {
      console.error("Failed to add auction winner chit:", error);
    },
  });
}

export function useCreatePayment() {
  const queryClient = useQueryClient();
  interface CreatePaymentVariables {
    data: AddPaymentPayload;
    chitId: string;
    installmentId: string;
  }
  return useMutation({
    // 1. Single variables object passed to mutationFn
    mutationFn: ({ data }: CreatePaymentVariables) => CreatePayment(data),

    // 2. Access variables (2nd param) in onSuccess
    onSuccess: (_, variables) => {
      console.log("VAR", variables);
      queryClient.invalidateQueries({
        queryKey: ["chitData", variables.chitId, variables.installmentId],
      });
    },

    onError: (error) => {
      console.error("Failed to add payment:", error);
    },
  });
}
export function useGetChits() {
  return useQuery<ChitList[], Error>({
    queryKey: ["chits"],
    queryFn: GetChitList,

    // Optional: Keep the data fresh, or adjust stale times depending on requirements
  });
}

// useGetChitData.ts
export function useGetChitData(chitId: string, installmentId: string) {
  return useQuery({
    // Adding installmentId here tells React Query to re-fetch when it changes!
    queryKey: ["chitData", chitId, installmentId],
    queryFn: () => GetChitData(chitId, installmentId),
    enabled: !!chitId && !!installmentId, // Won't run until both IDs exist
  });
}

export function useGetChitMembers(id?: string) {
  return useQuery({
    queryKey: ["chitmembers", id],
    queryFn: () => GetChitMembers(id!),
    enabled: Boolean(id), // Automatically stays disabled if id is undefined or empty
    staleTime: 1000 * 60 * 5,
  });
}

export function useGetChitInstallments(id?: string) {
  return useQuery({
    queryKey: ["chitinstallments", id],
    queryFn: () => GetChitInstallements(id!),
    enabled: Boolean(id), // Automatically stays disabled if id is undefined or empty
    staleTime: 1000 * 60 * 5,
  });
}

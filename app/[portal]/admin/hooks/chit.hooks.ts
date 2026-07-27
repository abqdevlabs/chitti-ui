import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AddChit, ChitList } from "../types/chit.type";
import {
  CreateAuctionWinner,
  CreateChit,
  GetChitData,
  GetChitInstallements,
  GetChitList,
  GetChitMembers,
} from "../api/chit.api";

export function useCreateChit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AddChit) => CreateChit(data),

    // Optional: Refresh your lists automatically after a successful creation
    onSuccess: () => {
      // Assuming you have a query list like ['chits']
      queryClient.invalidateQueries({ queryKey: ["chits"] });
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

export function useGetChits() {
  return useQuery<ChitList[], Error>({
    queryKey: ["chits"],
    queryFn: GetChitList,

    // Optional: Keep the data fresh, or adjust stale times depending on requirements
    staleTime: 1000 * 60 * 5, // 5 minutes
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

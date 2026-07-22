import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AddChit, ChitList } from "../types/chit.type";
import {
  CreateChit,
  GetChitData,
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

export function useGetChits() {
  return useQuery<ChitList[], Error>({
    queryKey: ["chits"],
    queryFn: GetChitList,

    // Optional: Keep the data fresh, or adjust stale times depending on requirements
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

// useGetChitData.ts
export function useGetChitData(id?: string) {
  return useQuery({
    queryKey: ["chit", id],
    queryFn: () => GetChitData(id!),
    enabled: Boolean(id), // Automatically stays disabled if id is undefined or empty
    staleTime: 1000 * 60 * 5,
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

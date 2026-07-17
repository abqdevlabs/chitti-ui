import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddChit } from "../types/chit.type";
import { CreateChit } from "../api/chit.api";

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

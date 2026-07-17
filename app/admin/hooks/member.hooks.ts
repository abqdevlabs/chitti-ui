import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateMember, getMembers } from "../api/member.api";
import { AddMember, MemberList } from "../types/member.type";

export function useGetMembers() {
  return useQuery<MemberList[], Error>({
    queryKey: ["members"],
    queryFn: getMembers,

    // Optional: Keep the data fresh, or adjust stale times depending on requirements
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useCreateMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AddMember) => CreateMember(data),

    // Optional: Refresh your lists automatically after a successful creation
    onSuccess: () => {
      // Assuming you have a query list like ['chits']
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },

    onError: (error) => {
      console.error("Failed to create chit:", error);
    },
  });
}

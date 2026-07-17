import { useQuery } from "@tanstack/react-query";
import { getMembers } from "../api/member.api";
import { MemberList } from "../types/member.type";

export function useGetMembers() {
  return useQuery<MemberList[], Error>({
    queryKey: ["members"],
    queryFn: getMembers,

    // Optional: Keep the data fresh, or adjust stale times depending on requirements
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

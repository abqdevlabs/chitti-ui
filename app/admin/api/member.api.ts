import { api } from "@app/api";
import { AddMember, MemberList } from "../types/member.type";

export async function CreateMember(data: AddMember) {
  const cleanedData = Object.fromEntries(
    Object.entries(data).filter(
      ([_, value]) => value !== null && value !== undefined && value !== "",
    ),
  );
  try {
    const res = await api.post("/chit/member", cleanedData);
    return res.data;
  } catch {}
}

export async function getMembers(): Promise<MemberList[]> {
  // Pass MemberList[] directly to the request generic (assuming Axios/similar underlying library)
  const res = await api.get<MemberList[]>("/chit/list/member");
  return res.data;
}

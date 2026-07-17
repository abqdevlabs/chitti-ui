import { api } from "@app/api";
import { AddMember, MemberList } from "../types/member.type";

export async function CreateMember(data: AddMember) {
  try {
    const res = await api.post("/chit/member", data);
    return res.data;
  } catch {}
}

export async function getMembers(): Promise<MemberList[]> {
  // Pass MemberList[] directly to the request generic (assuming Axios/similar underlying library)
  const res = await api.get<MemberList[]>("/chit/list/member");
  return res.data;
}

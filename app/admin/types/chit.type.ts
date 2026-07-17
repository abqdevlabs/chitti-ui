import { MemberList } from "./member.type";

export interface AddChit {
  name: string;
  total: number;
  monthly: number;
  members: number;
  duration: number;
  durationUnit: "month";
  commission: number;
  membersId: string[];
}

export interface ChitList {
  id: string;
  name: string;
  monthly: string;
  total: string;
  members: MemberList[];
}

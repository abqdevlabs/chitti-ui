export interface AddChit {
  name: string;
  total: number;
  monthly: number;
  members: number;
  duration: number;
  durationUnit: "month";
  commision: number;
  membersId: string[];
}

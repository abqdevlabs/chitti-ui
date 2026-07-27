export interface AddMember {
  name: string;
  mail?: string;
  phone: string;
  dob?: string;
  aadhar?: string;
  pan?: string;
  aadharImg?: string;
  nomineeName?: string;
  nomineeRelation?: string;
}

export interface MemberList {
  id: string;
  phone: string;
  name: string;
  verified?: boolean;
}

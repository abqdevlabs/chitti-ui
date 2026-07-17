import { create } from "zustand";
import { AddMember } from "@app/admin/types/member.type";

const initialState: AddMember = {
  name: "",
  mail: "",
  phone: "",
  dob: "",
  aadhar: "",
  pan: "",
  aadharImg: "",
  nomineeName: "",
  nomineeRelation: "",
};

interface AddMemberStore {
  member: AddMember;

  setField: <K extends keyof AddMember>(field: K, value: AddMember[K]) => void;

  setMember: (member: Partial<AddMember>) => void;

  reset: () => void;
}

export const useAddMemberStore = create<AddMemberStore>((set) => ({
  member: initialState,

  setField: (field, value) =>
    set((state) => ({
      member: {
        ...state.member,
        [field]: value,
      },
    })),

  setMember: (member) =>
    set((state) => ({
      member: {
        ...state.member,
        ...member,
      },
    })),

  reset: () =>
    set({
      member: initialState,
    }),
}));

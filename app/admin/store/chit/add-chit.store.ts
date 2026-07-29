import { AddChit } from "@/admin/types/chit.type";
import { create } from "zustand";

const initialState: AddChit = {
  name: "",
  total: 0,
  monthly: 0,
  members: 0,
  duration: 0,
  durationUnit: "month",
  commission: 0,
  startMonth: "July",
  startYear: 2026,
  paymentDay: 5,
  auctionDay: 25,
  membersId: [],
};

interface AddSchemeStore {
  scheme: AddChit;
  setField: <K extends keyof AddChit>(field: K, value: AddChit[K]) => void;
  toggleMember: (id: string) => void;
  selectAllMembers: (ids: string[]) => void;
  removeMember: (id: string) => void;
  setScheme: (scheme: Partial<AddChit>) => void;
  reset: () => void;
}

export const useAddSchemeStore = create<AddSchemeStore>((set) => ({
  scheme: initialState,

  setField: (field, value) =>
    set((state) => ({
      scheme: {
        ...state.scheme,
        [field]: value,
      },
    })),

  setScheme: (scheme) =>
    set((state) => ({
      scheme: {
        ...state.scheme,
        ...scheme,
      },
    })),

  toggleMember: (id: string) =>
    set((state) => {
      const currentMembers = state.scheme?.membersId ?? [];
      const membersId = currentMembers.includes(id)
        ? currentMembers.filter((x: string) => x !== id)
        : [...currentMembers, id];

      return {
        scheme: {
          ...state.scheme,
          membersId,
        },
      };
    }),

  removeMember: (id: string) =>
    set((state) => ({
      scheme: {
        ...state.scheme,
        membersId: (state.scheme?.membersId ?? []).filter(
          (x: string) => x !== id,
        ),
      },
    })),

  selectAllMembers: (ids: string[]) =>
    set((state) => ({
      scheme: {
        ...state.scheme,
        membersId: Array.from(
          new Set([...(state.scheme?.membersId ?? []), ...ids]),
        ),
      },
    })),

  reset: () =>
    set({
      scheme: initialState,
    }),
}));

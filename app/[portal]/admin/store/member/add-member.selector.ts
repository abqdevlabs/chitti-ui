"use client";
import { useAddMemberStore } from "@admin/store/member/add-member.store";

export const useMember = () => useAddMemberStore((state) => state.member);

export const useSetMemberField = () =>
  useAddMemberStore((state) => state.setField);

export const useResetMember = () => useAddMemberStore((state) => state.reset);

export const useSetMember = () => useAddMemberStore((state) => state.setMember);

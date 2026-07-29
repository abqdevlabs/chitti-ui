"use client";

import { useAddSchemeStore } from "./add-chit.store";

export const useScheme = () => useAddSchemeStore((state) => state.scheme);

export const useSetSchemeField = () =>
  useAddSchemeStore((state) => state.setField);
export const useToggleMember = () =>
  useAddSchemeStore((state) => state.toggleMember);
export const useRemoveMember = () =>
  useAddSchemeStore((state) => state.removeMember);
export const useResetScheme = () => useAddSchemeStore((state) => state.reset);

export const useSetScheme = () => useAddSchemeStore((state) => state.setScheme);

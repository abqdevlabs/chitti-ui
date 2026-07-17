"use client";

import { useAddSchemeStore } from "@app/admin/store/chit/add-chit.store";

export const useScheme = () => useAddSchemeStore((state) => state.scheme);

export const useSetSchemeField = () =>
  useAddSchemeStore((state) => state.setField);

export const useResetScheme = () => useAddSchemeStore((state) => state.reset);

export const useSetScheme = () => useAddSchemeStore((state) => state.setScheme);

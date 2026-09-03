"use client";

import { useState } from "react";
import { Check, ChevronDown, Plus, Search } from "lucide-react";
import { Input } from "@app/components/ui/input";
import { Label } from "@app/components/ui/label";

export interface LookupItem {
  id: string;
  name: string;
}

interface ExpenseLookupFieldProps {
  id: string;
  label: string;
  placeholder: string;
  createLabel: string;
  items: LookupItem[];
  value: string;
  allowCreate?: boolean;
  valueType?: "id" | "name";
  onSelect: (item: LookupItem) => void;
  onCreate: (name: string) => Promise<LookupItem | undefined>;
  isCreating?: boolean;
}

export function ExpenseLookupField({
  id,
  label,
  placeholder,
  createLabel,
  items,
  value,
  allowCreate = true,
  valueType = "id",
  onSelect,
  onCreate,
  isCreating = false,
}: ExpenseLookupFieldProps) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [selectedName, setSelectedName] = useState("");

  const selected = items.find((item) =>
    valueType === "id" ? item.id === value : item.name === value,
  );
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );
  const canCreate =
    search.trim().length > 0 &&
    !items.some(
      (item) => item.name.toLowerCase() === search.trim().toLowerCase(),
    );

  const handleCreate = async () => {
    const name = search.trim();
    if (!name) return;

    try {
      const created = await onCreate(name);
      if (created) {
        onSelect(created);
        setSelectedName(created.name);
        setSearch("");
        setOpen(false);
      }
    } catch {
      setError(
        `Could not create this ${label.toLowerCase()}. Please try again.`,
      );
    }
  };

  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            id={id}
            value={value ? search || selected?.name || selectedName : search}
            onChange={(event) => {
              setSelectedName("");
              setSearch(event.target.value);
              onSelect({ id: "", name: event.target.value });
              setOpen(true);
              setError("");
            }}
            onFocus={() => setOpen(true)}
            placeholder={placeholder}
            autoComplete="off"
            className="pr-9 pl-9"
            required
          />
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        </div>
        {open && (
          <div className="absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded-lg border border-slate-200 bg-white p-1 shadow-lg">
            {filteredItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onSelect(item);
                  setSelectedName(item.name);
                  setSearch("");
                  setOpen(false);
                }}
                className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
              >
                {item.name}
                {((valueType === "id" && item.id === value) ||
                  (valueType === "name" && item.name === value)) && (
                  <Check className="h-4 w-4 text-blue-700" />
                )}
              </button>
            ))}
            {!filteredItems.length && (
              <p className="px-3 py-2 text-xs text-slate-400">No matches</p>
            )}
            {allowCreate && canCreate && (
              <button
                type="button"
                onClick={handleCreate}
                disabled={isCreating}
                className="mt-1 flex w-full items-center gap-2 border-t border-slate-100 px-3 py-2 text-left text-xs font-semibold text-blue-700 hover:bg-blue-50 disabled:cursor-wait disabled:opacity-60"
              >
                <Plus className="h-3.5 w-3.5" />
                {isCreating
                  ? "Adding..."
                  : `${createLabel}: "${search.trim()}"`}
              </button>
            )}
          </div>
        )}
      </div>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}

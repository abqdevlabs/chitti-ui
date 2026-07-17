"use client";

import Image from "next/image";
import { Check, Circle } from "lucide-react";
import { cn } from "@app/lib/utils";

export interface MemberListItemProps {
  id: string;
  memberId: string;
  name: string;
  verified?: boolean;
  selected?: boolean;
  disabled?: boolean;
  onSelect?: (id: string) => void;
}

export function MemberListItem({
  id,
  memberId,
  name,
  verified = false,
  selected = false,
  disabled = false,
  onSelect,
}: MemberListItemProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onSelect?.(id)}
      className={cn(
        "group flex w-full items-center justify-between rounded-xl border border-outline-variant/40 bg-card p-4 text-left transition-all duration-200",
        "hover:border-primary/40 hover:shadow-md",
        selected && "border-primary ring-2 ring-primary/10",
        disabled && "cursor-not-allowed opacity-60",
      )}
    >
      {/* Left */}
      <div className="flex min-w-0 items-center gap-4">
        <div className="relative h-12 w-12 overflow-hidden rounded-full bg-surface-container">
          <div className="flex h-full w-full items-center justify-center text-lg font-semibold text-primary">
            {name.charAt(0).toUpperCase()}
          </div>
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-base font-semibold text-on-surface">
              {name}
            </h3>

            {verified && (
              <div
                title="Verified"
                className="flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-on-secondary"
              >
                <Check className="h-3 w-3" />
              </div>
            )}
          </div>

          <p className="mt-1 text-xs font-medium tracking-wide text-on-surface-variant">
            ID: {memberId}
          </p>
        </div>
      </div>

      {/* Right */}
      <div
        className={cn(
          "flex h-6 w-6 items-center justify-center rounded-md border-2 transition-all",
          selected ? "border-primary bg-primary text-white" : "border-outline",
        )}
      >
        {selected ? (
          <Check className="h-4 w-4" />
        ) : (
          <Circle className="h-3 w-3 opacity-0" />
        )}
      </div>
    </button>
  );
}

import React from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface MemberSelectorProps {
  id: string;
  name: string;
  phoneOrId: string;
  isSelected: boolean;
  onToggle: (id: string) => void;
}

export const MemberSelector: React.FC<MemberSelectorProps> = ({
  id,
  name,
  phoneOrId,
  isSelected,
  onToggle,
}) => {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      onClick={() => onToggle(id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle(id);
        }
      }}
      className={`
        flex items-center justify-between p-3.5 rounded-lg border cursor-pointer select-none 
        transition-all duration-200 
        ${
          isSelected
            ? "border-primary bg-primary/5 text-primary shadow-xs"
            : "border-border hover:bg-muted/50 hover:border-muted-foreground/30"
        }
      `}
    >
      {/* Left: Member Info */}
      <div className="flex flex-col gap-0.5">
        <p className="font-semibold text-sm text-foreground">{name}</p>
        <p className="font-medium text-xs text-muted-foreground">
          ID: {phoneOrId}
        </p>
      </div>

      {/* Right: Selector Checkbox */}
      <div className="pointer-events-none">
        <Checkbox
          id={`member-select-${id}`}
          checked={isSelected}
          tabIndex={-1}
        />
      </div>
    </div>
  );
};

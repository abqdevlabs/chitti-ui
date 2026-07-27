import React from "react";
// Assuming these are your local UI imports (e.g., Shadcn or custom components)
import { Checkbox } from "@/components/ui/checkbox";

interface MemberSelectorProps {
  id: string;
  name: string;
  phoneOrId: string;
  isSelected: boolean;
  onToggle: (id: string, checked: boolean) => void;
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
      // Toggles selection on card click
      onClick={() => onToggle(id, !isSelected)}
      className={
        "flex  rounded-lg cursor-pointer select-none transition-all duration-200 border-border hover:bg-muted/50 hover:border-muted-foreground/30"
      }
    >
      {/* Member Details */}
      {/* 1. Added "w-full justify-between items-center" */}
      <div className="flex flex-row w-full justify-between items-center">
        {/* Left: Member Info */}
        <div className="flex flex-col gap-0.5 pointer-events-none">
          <p className="text-text-primary font-semibold text-sm">{name}</p>
          <p className="text-text-secondary font-medium text-xs">
            ID: {phoneOrId}
          </p>
        </div>

        {/* Right: Selector Checkbox */}
        <Checkbox
          id={`member-select-${id}`}
          checked={isSelected}
          onCheckedChange={(checked) => onToggle(id, !!checked)}
          // Stops click event bubbling to prevent double-toggling when clicking the checkbox itself
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  );
};

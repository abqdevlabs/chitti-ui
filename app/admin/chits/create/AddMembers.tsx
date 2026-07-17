"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import { Input } from "@app/components/ui/input";
import { Checkbox } from "@app/components/ui/checkbox";
import { Label } from "@app/components/ui/label";

import { MemberListItem } from "@app/admin/components/member/member-list";
import { MemberList } from "@app/admin/types/member.type";

interface AddMembersProps {
  members: MemberList[];
  selected: string[];
  disabled?: boolean;
  onSelect: (id: string) => void;
  onSelectAll: (ids: string[]) => void;
}

export default function AddMembers({
  members,
  selected,
  disabled = false,
  onSelect,
  onSelectAll,
}: AddMembersProps) {
  const [search, setSearch] = useState("");

  const filteredMembers = useMemo(() => {
    return members.filter(
      (member) =>
        member.name.toLowerCase().includes(search.toLowerCase()) ||
        member.memberId.toLowerCase().includes(search.toLowerCase()),
    );
  }, [members, search]);

  const allSelected =
    filteredMembers.length > 0 &&
    filteredMembers.every((m) => selected.includes(m.id));

  const handleSelectAll = () => {
    if (allSelected) {
      filteredMembers.forEach((m) => {
        if (selected.includes(m.id)) {
          onSelect(m.id);
        }
      });
      return;
    }

    onSelectAll(filteredMembers.map((m) => m.id));
  };

  return (
    <div className="space-y-5">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-on-surface-variant" />

        <Input
          className="pl-10"
          placeholder="Search by name or member ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Select All */}
      <div className="flex items-center justify-between rounded-lg border border-outline-variant p-4">
        <div className="flex items-center gap-3">
          <Checkbox checked={allSelected} onCheckedChange={handleSelectAll} />

          <Label>Select All</Label>
        </div>

        <span className="text-sm text-on-surface-variant">
          {selected.length} / {members.length} Selected
        </span>
      </div>

      {/* Members */}
      <div className="space-y-3 max-h-125 overflow-y-auto">
        {filteredMembers.map((member) => (
          <MemberListItem
            key={member.id}
            id={member.id}
            memberId={member.memberId}
            name={member.name}
            verified={member.verified}
            disabled={disabled}
            selected={selected.includes(member.id)}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}

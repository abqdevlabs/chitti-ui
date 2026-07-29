"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@app/components/ui/dialog";
import { Button } from "@app/components/ui/Button";
import { Input } from "@app/components/ui/input";

interface Member {
  name: string;
  phone: string;
}

interface AddMembersModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (members: Member[]) => void;
}

export function AddMembersModal({
  open,
  onOpenChange,
  onSubmit,
}: AddMembersModalProps) {
  const [members, setMembers] = useState<Member[]>([
    {
      name: "",
      phone: "",
    },
  ]);
  type MemberError = {
    name?: string;
    phone?: string;
  };

  const [errors, setErrors] = useState<Record<number, MemberError>>({});

  const updateMember = (index: number, field: keyof Member, value: string) => {
    setMembers((prev) =>
      prev.map((member, i) =>
        i === index ? { ...member, [field]: value } : member,
      ),
    );

    setErrors((prev) => {
      const next = { ...prev };

      if (next[index]) {
        delete next[index][field];

        if (!next[index].name && !next[index].phone) {
          delete next[index];
        }
      }

      return next;
    });
  };
  const addMember = () => {
    setMembers((prev) => [
      ...prev,
      {
        name: "",
        phone: "",
      },
    ]);
  };

  const removeMember = (index: number) => {
    if (members.length === 1) return;

    setMembers((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const newErrors: Record<number, MemberError> = {};
    const seen = new Map<string, number>();

    members.forEach((member, index) => {
      if (!member.name.trim() || !member.phone.trim()) return;

      if (seen.has(member.phone)) {
        newErrors[index] = { phone: "Phone number already entered" };
      } else {
        seen.set(member.phone, index);
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const filtered = members.filter((m) => m.name.trim() && m.phone.trim());

    onSubmit(filtered);

    setMembers([
      {
        name: "",
        phone: "",
      },
    ]);

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-hidden sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Members</DialogTitle>
        </DialogHeader>

        <div className="max-h-[60vh] space-y-4 overflow-y-auto pr-2">
          {members.map((member, index) => (
            <div
              key={index}
              className="flex flex-col gap-3 rounded-xl border p-4 md:flex-row md:items-start"
            >
              <div className="flex-1">
                <Input
                  placeholder="Member Name"
                  value={member.name}
                  onChange={(e) => updateMember(index, "name", e.target.value)}
                />
              </div>

              <div className="flex-1">
                <Input
                  placeholder="Phone Number"
                  inputMode="numeric"
                  maxLength={10}
                  value={member.phone}
                  onChange={(e) =>
                    updateMember(
                      index,
                      "phone",
                      e.target.value.replace(/\D/g, ""),
                    )
                  }
                  className={errors[index]?.phone ? "border-red-500" : ""}
                />

                {errors[index]?.phone && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors[index]?.phone}
                  </p>
                )}
              </div>

              <Button
                type="button"
                variant="destructive"
                size="icon"
                disabled={members.length === 1}
                onClick={() => removeMember(index)}
                className="md:mt-0 md:self-start"
              >
                <Trash2 size={18} />
              </Button>
            </div>
          ))}
        </div>

        <Button
          type="button"
          variant="outline"
          className="mt-4 w-full"
          onClick={addMember}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Another Member
        </Button>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>

          <Button onClick={handleSubmit}>Save Members</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

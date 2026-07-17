"use client";

import { Plus } from "lucide-react";
import { useGetMembers } from "../hooks/member.hooks";
import { Button } from "@app/components/ui/Button";
import { useRouter } from "next/navigation";
import MemberRegistrationModal from "./create/MemberAddModal";
import { useState } from "react";
import {
  useMember,
  useSetMemberField,
} from "../store/member/add-member.selector";
import { useAddMemberStore } from "../store/member/add-member.store";
import { AddMember } from "../types/member.type";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@app/components/ui/dialog";

export default function MembersPage() {
  const router = useRouter();
  const [isOpen, setIsopen] = useState(false);
  const member = useMember();
  const reset = useAddMemberStore((state) => state.reset);
  const setField = useSetMemberField();
  const { data, isLoading } = useGetMembers();
  function onSave(data: AddMember) {
    console.log(data);
  }
  return (
    <div className="">
      <Button onClick={() => setIsopen(true)} leftIcon={<Plus />}>
        Add Member
      </Button>
      {/* <MemberRegistrationModal
        isOpen={isOpen}
        onClose={() => setIsopen(false)}
        member={member}
        setField={setField}
        onReset={reset}
        onSave={onSave}
      /> */}
      <div>
        <Dialog open={true} onOpenChange={() => {}}>
          <DialogContent className="max-w-4xl p-0">
            <DialogHeader className="p-6">
              <DialogTitle>Member Registration</DialogTitle>
            </DialogHeader>

            <div className="max-h-[80vh] overflow-y-auto p-6">
              {/* Long form */}
            </div>

            <DialogFooter className="border-t p-6">
              <Button variant="outline">Cancel</Button>

              <Button>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

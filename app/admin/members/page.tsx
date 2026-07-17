"use client";

import { Button } from "@/components/ui/button";
import MemberRegistrationForm from "./create/MemberAddForm";
import {
  useMember,
  useSetMemberField,
} from "../store/member/add-member.selector";
import { useAddMemberStore } from "../store/member/add-member.store";
import { AddMember } from "../types/member.type";
import { useCreateMember } from "../hooks/member.hooks";

export default function MembersPage() {
  const member = useMember();
  const reset = useAddMemberStore((state) => state.reset);
  const setField = useSetMemberField();
  const { mutate } = useCreateMember();
  function OnSave(data: AddMember) {
    mutate(data);
    reset();
  }

  return (
    <div className="">
      <Button>Add Member</Button>

      <MemberRegistrationForm
        member={member}
        setField={setField}
        onReset={reset}
        onSave={(data) => OnSave(data)}
      />
    </div>
  );
}

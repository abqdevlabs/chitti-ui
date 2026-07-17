"use client";
import MemberRegistrationForm from "@app/admin/members/create/MemberAddForm";
import {
  useMember,
  useSetMemberField,
} from "@app/admin/store/member/add-member.selector";
import { AddMember } from "@app/admin/types/member.type";
import { useAddMemberStore } from "@app/admin/store/member/add-member.store";

export default function MembersPage() {
  const member = useMember();
  const reset = useAddMemberStore((state) => state.reset);
  const setField = useSetMemberField();
  function onSave(data: AddMember) {
    console.log(data);
  }
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-2">
        <p className="text-headline-lg">Regsitration</p>
        <p className="ml-2 text-sub-md">
          Onboard a new member to the digital chit fund platform. Ensure all KYC
          details are accurate.
        </p>
      </div>

      <div
        id="container"
        className="bg-card self-stretch p-8 relative  rounded-xl shadow-subtle outline-1 -outline-offset-1 outline-slate-300/30 inline-flex flex-col justify-start items-center gap-16"
      >
        <div className="self-stretch inline-flex flex-col justify-start items-start gap-1">
          <MemberRegistrationForm
            member={member}
            setField={setField}
            onReset={reset}
            onSave={(data) => onSave(data)}
          />
        </div>
      </div>
    </div>
  );
}

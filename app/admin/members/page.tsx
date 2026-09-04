"use client";

import { Button } from "@/components/ui/Button";
import MemberRegistrationForm from "./create/MemberAddForm";
import {
  useMember,
  useSetMemberField,
} from "../store/member/add-member.selector";
import { useAddMemberStore } from "../store/member/add-member.store";
import { AddMember, MemberList } from "../types/member.type";
import { useCreateMember, useGetMembers } from "../hooks/member.hooks";
import { ReusableDataTable } from "@/components/ui/data-table";
import { useRouter } from "next/navigation";

export default function MembersPage() {
  const member = useMember();
  const router = useRouter();
  const reset = useAddMemberStore((state) => state.reset);
  const setField = useSetMemberField();
  // const [edit, setEdit] = useState<MemberList>();
  // const [editOpen, setEditOpen] = useState(false);
  const { mutate } = useCreateMember();
  function OnSave(data: AddMember) {
    mutate(data);
    reset();
  }
  const { data: members } = useGetMembers();

  const columns = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "phone",
      header: "Phone",
    },
  ];
  const handleView = (user: MemberList) => {
    router.push(`/admin/chits/${user.id}`);
    console.log("Navigating to view user:", user.id);
  };

  const handleEdit = (user: MemberList) => {
    // router.push(`/users/${user.id}/edit`);
    // setEdit(user);
    // setEditOpen(true);
    console.log("Navigating to edit user:", user.id);
  };
  return (
    <div className="">
      <Button>Add Member</Button>
      <ReusableDataTable
        title="Chits"
        data={members ?? []}
        columns={columns}
        searchKey="name"
        searchPlaceholder="Filter users by name..."
        onView={handleView}
        onEdit={handleEdit}
      />
      <MemberRegistrationForm
        member={member}
        setField={setField}
        onReset={reset}
        onSave={(data) => OnSave(data)}
      />
    </div>
  );
}

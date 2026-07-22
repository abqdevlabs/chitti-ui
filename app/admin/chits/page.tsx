"use client";
import { Button } from "@app/components/ui/Button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { ChitCreateModal } from "./create/ChitForm";
import { useCreateChit, useGetChits } from "../hooks/chit.hooks";
import {
  useScheme,
  useToggleMember,
  useSetSchemeField,
  useRemoveMember,
} from "../store/chit/add-chit.selector";
import { useGetMembers } from "../hooks/member.hooks";
import { ReusableDataTable } from "@/components/ui/data-table";
import { ChitList } from "../types/chit.type";
import { useRouter } from "next/navigation";

export default function ChitsPage() {
  const [open, setOpen] = useState(false);
  const chit = useScheme();

  const setField = useSetSchemeField();
  const toggle = useToggleMember();
  const remove = useRemoveMember();

  const { mutate } = useCreateChit();
  const { data: members } = useGetMembers();
  const { data: chits } = useGetChits();
  // function onSave(data: AddChit) {
  //   mutate(data);
  // }
  const columns = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "monthly",
      header: "Monthly",
    },
    {
      accessorKey: "total",
      header: "Total",
    },
  ];
  const router = useRouter();
  const handleView = (user: ChitList) => {
    router.push(`/admin/chits/${user.id}`);
    console.log("Navigating to view user:", user.id);
  };

  const handleEdit = (user: ChitList) => {
    router.push(`/users/${user.id}/edit`);
    console.log("Navigating to edit user:", user.id);
  };
  return (
    <div>
      <Button onClick={() => setOpen(true)}>
        <Plus data-icon="inline-start" /> Create Chit
      </Button>
      {open && (
        <ChitCreateModal
          chit={chit}
          setField={setField}
          onSave={(data) => {
            mutate(data);
            setOpen(false);
          }}
          members={members ?? []}
          toggle={toggle}
          remove={remove}
        />
      )}
      <div className="container mx-auto py-10">
        <ReusableDataTable
          title="Chits"
          data={chits ?? []}
          columns={columns}
          searchKey="name"
          searchPlaceholder="Filter users by name..."
          onView={handleView}
          onEdit={handleEdit}
        />
      </div>
    </div>
  );
}

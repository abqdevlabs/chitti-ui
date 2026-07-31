"use client";
import { Button } from "@app/components/ui/Button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { ChitCreateModal } from "./create/ChitForm";
import {
  useChangeChitOrder,
  useCreateChit,
  useGetChits,
} from "../hooks/chit.hooks";
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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useQueryClient } from "@tanstack/react-query";

export default function ChitsPage() {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editId, setEditId] = useState("");

  const chit = useScheme();

  const setField = useSetSchemeField();
  const toggle = useToggleMember();
  const remove = useRemoveMember();

  const { mutate } = useCreateChit();
  const { mutate: changeOrderApi } = useChangeChitOrder();

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
    setOpenEdit(true);
    setEditId(user.id);
    console.log("Navigating to edit user:", user.id);
  };
  // const saveOrder = () => {

  // };
  return (
    <div>
      <Button onClick={() => setOpen(true)}>
        <Plus data-icon="inline-start" /> Create Chit
      </Button>

      <DialogCloseButton
        open={openEdit}
        onOpenChange={() => setOpenEdit(false)}
        onSave={(order) => {
          changeOrderApi({ id: editId, order });
          setOpenEdit(false);
        }}
      />
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

interface DialogCloseButtonProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (order: number) => void;
}

export function DialogCloseButton({
  open,
  onOpenChange,
  onSave,
}: DialogCloseButtonProps) {
  const [value, setValue] = useState(0);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Change Order</DialogTitle>
          <DialogDescription>Change the Order of the Chit.</DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="number" className="sr-only">
              Number
            </Label>

            <Input
              id="number"
              defaultValue="1"
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
            />
          </div>
        </div>

        <DialogFooter className="sm:justify-end">
          <DialogClose render={<Button variant="destructive">Close</Button>} />
          <Button onClick={() => onSave(value)}> Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

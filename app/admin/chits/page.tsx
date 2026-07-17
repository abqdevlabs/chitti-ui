"use client";
import { Button } from "@app/components/ui/Button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ChitsPage() {
  const router = useRouter();
  return (
    <div>
      {" "}
      <Button
        leftIcon={<Plus />}
        onClick={() => router.push("/admin/chits/create")}
      >
        Create Chit
      </Button>
    </div>
  );
}

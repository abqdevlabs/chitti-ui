"use client";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { CardForm } from "./CardForm";

export default function ChitDetail() {
  const param = useParams().id;
  return (
    <div>
      <Button>Generate Card</Button>
      <CardForm />
    </div>
  );
}

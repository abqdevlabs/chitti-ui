"use client";

import CreateChitForm from "./ChitCreateForm";
import {
  useScheme,
  useSetSchemeField,
} from "@app/admin/store/chit/add-chit.selector";
import { useAddSchemeStore } from "@app/admin/store/chit/add-chit.store";
import { AddChit } from "@app/admin/types/chit.type";
import AddMembers from "./AddMembers";
import { useState } from "react";
import clsx from "clsx";
import { Check } from "lucide-react";
import { Button } from "@app/components/ui/Button";
import { MemberList } from "@app/admin/types/member.type";
import { useCreateChit } from "@app/admin/hooks/chit.hooks";
import { useGetMembers } from "@app/admin/hooks/member.hooks";
export default function ChitsCreatePage() {
  const chit = useScheme();
  const reset = useAddSchemeStore((state) => state.reset);
  const setField = useSetSchemeField();
  const { mutate } = useCreateChit();
  function onSave(data: AddChit) {
    mutate(data);
  }
  const [step, setStep] = useState(1);

  const nextStep = () => {
    if (step < 2) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };
  const steps = [
    {
      id: 1,
      title: "Scheme Details",
    },
    {
      id: 2,
      title: "Add Members",
    },
  ];

  const toggleMember = useAddSchemeStore((state) => state.toggleMember);
  const selectAllMembers = useAddSchemeStore((state) => state.selectAllMembers);
  const membersId = useAddSchemeStore((state) => state.scheme.membersId);

  const { data: members, isLoading, isError, error } = useGetMembers();

  if (isLoading) {
    return <div>Loading members...</div>;
  }

  if (isError) {
    return <div>Error loading members: {error.message}</div>;
  }
  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <div className="flex flex-col gap-2">
        <p className="text-headline-lg">Registration</p>

        <p className="ml-2 text-sub-md">
          Onboard a new member to the digital chit fund platform. Ensure all KYC
          details are accurate.
        </p>
      </div>

      {/* Card */}
      <div className="bg-card mt-6 rounded-xl p-8 shadow-subtle outline-1 outline-slate-300/30">
        {/* ================= Stepper ================= */}
        <div className="mb-12 flex items-center">
          {steps.map((item, index) => (
            <div key={item.id} className="flex flex-1 items-center">
              <div className="flex flex-col items-center">
                <div
                  className={clsx(
                    "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all",
                    step >= item.id
                      ? "border-primary bg-primary text-white"
                      : "border-outline bg-surface",
                  )}
                >
                  {step > item.id ? <Check size={18} /> : item.id}
                </div>

                <span
                  className={clsx(
                    "mt-2 text-sm font-medium",
                    step >= item.id
                      ? "text-primary"
                      : "text-on-surface-variant",
                  )}
                >
                  {item.title}
                </span>
              </div>

              {index < steps.length - 1 && (
                <div
                  className={clsx(
                    "mx-6 h-0.5 flex-1",
                    step > item.id ? "bg-primary" : "bg-outline-variant",
                  )}
                />
              )}
            </div>
          ))}
        </div>

        {/* ================= Content ================= */}

        <div className="min-h-125">
          {step === 1 && (
            <CreateChitForm
              chit={chit}
              setField={setField}
              onReset={reset}
              onSave={() => nextStep()}
            />
          )}

          {step === 2 && (
            <AddMembers
              members={members ?? []}
              selected={membersId}
              onSelect={toggleMember}
              onSelectAll={selectAllMembers}
            />
          )}
        </div>

        {/* ================= Footer ================= */}

        <div className="mt-12 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
          <Button variant="outline" disabled={step === 1} onClick={prevStep}>
            Previous
          </Button>

          {step === 1 ? (
            <Button onClick={nextStep}>Next</Button>
          ) : (
            <Button
              onClick={() => {
                onSave(chit);
              }}
            >
              Create Chit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

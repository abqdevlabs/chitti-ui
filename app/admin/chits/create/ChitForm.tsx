"use client";

import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Button } from "@app/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@app/components/ui/card";
import { Input } from "@app/components/ui/input";
import { MoveLeftIcon, MoveRightIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@app/components/ui/stepper";
import { CheckIcon, LoaderCircleIcon } from "lucide-react";
import { useState } from "react";
import { MemberSelector } from "./MemberListCard";
import { AddChit } from "@/admin/types/chit.type";
import { MemberList } from "@/admin/types/member.type";
import { MonthSelect } from "../[id]/List";
import { useAddSchemeStore } from "@/admin/store/chit/add-chit.store";
type props = {
  chit: AddChit;
  setField: <K extends keyof AddChit>(field: K, value: AddChit[K]) => void;
  onSave: (data: AddChit) => void;
  members: MemberList[];
  toggle: (id: string) => void;
  remove: (id: string) => void;
};
const MONTH_LIST = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const DATE_LIST = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
];
export function ChitCreateModal({
  chit,
  setField,
  onSave,
  members,
  toggle,
  remove,
}: props) {
  const t = useTranslations("chitRegistration");
  const t2 = useTranslations("memberRegistration");

  const steps = [
    { id: 1, title: "Basic", description: "Create your account" },
    { id: 2, title: "Members", description: "Set up your profile" },
    { id: 3, title: "Review", description: "Review and finish" },
  ];
  const [currentStep, setCurrentStep] = useState(1);
  const scheme = useAddSchemeStore((state) => state.scheme);
  const toggleMember = useAddSchemeStore((state) => state.toggleMember);
  const selectAllMembers = useAddSchemeStore((state) => state.selectAllMembers);

  const selectedIds = scheme.membersId ?? [];
  const allMemberIds = members.map((m) => m.id);
  const isAllSelected =
    members.length > 0 && allMemberIds.every((id) => selectedIds.includes(id));

  const handleSelectAll = () => {
    if (isAllSelected) {
      setField("membersId", []);
    } else {
      selectAllMembers(allMemberIds);
    }
  };

  const handleSubmit = () => {
    onSave(scheme);
  };
  //   const handleToggle = (id: string, checked: boolean) => {
  //     if (checked) {
  //       setSelectedIds((prev) => [...prev, id]);
  //       setField("membersId", selectedIds);
  //     } else {
  //       setSelectedIds((prev) => prev.filter((item) => item !== id));
  //       setField("membersId", selectedIds);
  //     }
  //   };

  // const handleToggle = (id: string, checked: boolean) => {
  //   if (checked) {
  //     setSelectedIds((prev) => [...prev, id]);

  //     toggle(id);
  //   } else {
  //     setSelectedIds((prev) => prev.filter((item) => item !== id));

  //     remove(id);
  //   }
  // };

  return (
    <Card className="w-full max-w-xl h-auto mx-auto flex flex-col justify-between">
      {/* Stepper Section */}
      <div className="p-6 pb-0">
        <Stepper
          value={currentStep}
          indicators={{
            completed: <CheckIcon className="size-3.5" />,
            loading: <LoaderCircleIcon className="size-3.5 animate-spin" />,
          }}
          className="w-full space-y-8"
        >
          <StepperNav>
            {steps.map((step, index) => {
              const stepNumber = index + 1;

              return (
                <StepperItem
                  key={step.id || index}
                  step={stepNumber}
                  className="relative flex-1 items-start"
                >
                  <StepperTrigger className="flex flex-col gap-2.5 w-full items-center text-center">
                    <StepperIndicator>{stepNumber}</StepperIndicator>
                    <StepperTitle>{step.title}</StepperTitle>
                  </StepperTrigger>

                  {steps.length > stepNumber && (
                    <StepperSeparator className="group-data-[state=completed]/step:bg-primary absolute inset-x-0 top-2.5 left-[calc(50%+0.875rem)] m-0 group-data-[orientation=horizontal]/stepper-nav:w-[calc(100%-2rem+0.225rem)] group-data-[orientation=horizontal]/stepper-nav:flex-none" />
                  )}
                </StepperItem>
              );
            })}
          </StepperNav>
        </Stepper>
      </div>

      {/* Step 1: Basic Information */}
      {currentStep === 1 && (
        <div>
          <CardHeader>
            <CardTitle>{t("sections.basic.title")}</CardTitle>
            <CardDescription>{t("sections.basic.description")}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col gap-6">
                <Field>
                  <FieldLabel htmlFor="fieldgroup-name">
                    {t("fields.name")}
                  </FieldLabel>
                  <Input
                    value={chit.name}
                    onChange={(e) => setField("name", e.target.value)}
                    id="fieldgroup-name"
                    placeholder="Diwali seetu"
                    className="rounded"
                  />
                </Field>

                <FieldGroup className="grid grid-cols-2 gap-4 max-w-md">
                  <Field>
                    <FieldLabel htmlFor="total">{t("fields.total")}</FieldLabel>
                    <Input
                      id="total"
                      placeholder="10,00,000"
                      type="text"
                      value={
                        chit.total ? chit.total.toLocaleString("en-IN") : ""
                      }
                      onChange={(e) => {
                        // 1. Remove commas and non-numeric characters
                        const rawValue = e.target.value
                          .replace(/,/g, "")
                          .replace(/[^0-9]/g, "");

                        // 2. Convert to number (default to 0 if empty)
                        const numValue = rawValue ? Number(rawValue) : 0;

                        setField("total", numValue);
                      }}
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="duration">
                      {t("fields.duration")}
                    </FieldLabel>
                    <Input
                      id="duration"
                      placeholder="24 Months"
                      value={chit.duration}
                      onChange={(e) =>
                        setField("duration", Number(e.target.value))
                      }
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="monthly">
                      {t("fields.monthly")}
                    </FieldLabel>
                    <Input
                      id="monthly"
                      placeholder="10,00,000"
                      value={
                        chit.monthly ? chit.monthly.toLocaleString("en-IN") : ""
                      }
                      onChange={(e) => {
                        // 1. Remove commas and non-numeric characters
                        const rawValue = e.target.value
                          .replace(/,/g, "")
                          .replace(/[^0-9]/g, "");

                        // 2. Convert to number (default to 0 if empty)
                        const numValue = rawValue ? Number(rawValue) : 0;

                        setField("monthly", numValue);
                      }}
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="commission">
                      {t("fields.commission")}
                    </FieldLabel>
                    <Input
                      id="commission"
                      placeholder="10%"
                      value={chit.commission}
                      onChange={(e) =>
                        setField("commission", Number(e.target.value))
                      }
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="startMonth">
                      {t("fields.startmonth")}
                    </FieldLabel>
                    <MonthSelect
                      months={MONTH_LIST}
                      value={chit.startMonth}
                      onChange={(month) => setField("startMonth", month)}
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="paymentday">
                      {t("fields.paymentday")}
                    </FieldLabel>
                    <MonthSelect
                      months={DATE_LIST}
                      value={String(chit.paymentDay)}
                      onChange={(month) =>
                        setField("paymentDay", Number(month))
                      }
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="auctionday">
                      {t("fields.auctionday")}
                    </FieldLabel>
                    <MonthSelect
                      months={DATE_LIST}
                      value={String(chit.auctionDay)}
                      onChange={(month) =>
                        setField("auctionDay", Number(month))
                      }
                    />
                  </Field>
                </FieldGroup>
              </div>
            </form>
          </CardContent>
        </div>
      )}

      {/* Step 2: Add Members */}
      {currentStep === 2 && (
        <div>
          <CardHeader>
            <CardTitle>{t2("create.title")}</CardTitle>
            <CardDescription>{t2("create.description")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input type="search" placeholder="Search members..." />

            {/* Added max height and scroll behavior to keep the card size stable */}
            <div className="flex flex-col gap-2 max-h-70 overflow-y-auto overflow-x-hidden   pr-1">
              {members.map((member: MemberList) => (
                <MemberSelector
                  key={member.id}
                  id={member.id}
                  name={member.name}
                  phoneOrId={member.phone}
                  isSelected={selectedIds.includes(member.id)}
                  onToggle={toggleMember}
                />
              ))}
            </div>
          </CardContent>
        </div>
      )}

      {/* Step 3: Review Details */}
      {currentStep === 3 && (
        <div>
          <CardHeader>
            <CardTitle>Review Details</CardTitle>
            <CardDescription>
              Double-check your setup before creating the chit.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Read-only Summary Cards */}
            <div className="grid grid-cols-2 gap-4 bg-muted/40 p-4 rounded-lg border border-border">
              <div>
                <p className="text-xs text-muted-foreground">
                  {" "}
                  {t("fields.name")}
                </p>
                <p className="font-semibold text-sm">{chit.name}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {t("fields.total")}
                </p>
                <p className="font-semibold text-sm">
                  {chit.total.toLocaleString("en-IN")}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {t("fields.duration")}
                </p>
                <p className="font-semibold text-sm">{chit.duration} Months</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {t("fields.monthly")}
                </p>
                <p className="font-semibold text-sm">
                  {chit.monthly.toLocaleString("en-IN")}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {t("fields.paymentday")}
                </p>
                <p className="font-semibold text-sm">
                  {" "}
                  {t("fields.allmonth")} {chit.paymentDay} {t("fields.date")}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {t("fields.auctionday")}
                </p>
                <p className="font-semibold text-sm">
                  {t("fields.allmonth")} {chit.auctionDay} {t("fields.date")}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  Selected Members
                </p>
                <p className="font-semibold text-sm">
                  {members
                    .filter((member) => selectedIds.includes(member.id)) // 1. Get selected members
                    .map((member) => member.name) // 2. Extract their names
                    .join(", ") || // 3. Join them with a comma
                    "No members selected"}
                </p>
              </div>
            </div>
          </CardContent>
        </div>
      )}

      {/* Footer Section */}
      <CardFooter className="flex flex-col gap-2 pt-4">
        {currentStep === 1 && (
          <Button
            type="button"
            className="w-full"
            onClick={() => setCurrentStep(2)}
          >
            Add Members
            <MoveRightIcon className="ml-2 size-4" />
          </Button>
        )}

        {currentStep === 2 && (
          <div className="flex w-full gap-3">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => setCurrentStep(1)}
            >
              <MoveLeftIcon className="mr-2 size-4" />
              Previous
            </Button>
            <Button
              type="button"
              className="flex-1"
              onClick={() => setCurrentStep(3)}
            >
              Review
              <MoveRightIcon className="ml-2 size-4" />
            </Button>
          </div>
        )}

        {currentStep === 3 && (
          <div className="flex w-full gap-3">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => setCurrentStep(2)}
            >
              <MoveLeftIcon className="mr-2 size-4" />
              Previous
            </Button>
            <Button
              type="submit"
              className="flex-1"
              onClick={() => onSave(chit)}
            >
              Create Chit
              <CheckIcon className="ml-2 size-4" />
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}

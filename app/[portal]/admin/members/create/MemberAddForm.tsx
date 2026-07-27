"use client";

import { useTranslations } from "next-intl";

import { Card } from "@app/components/ui/card";
import { Input } from "@app/components/ui/input";
import { Label } from "@app/components/ui/label";
import { AddMember } from "../../types/member.type";
import { Button } from "@/components/ui/Button";

type props = {
  member: AddMember;
  setField: <K extends keyof AddMember>(field: K, value: AddMember[K]) => void;
  onSave: (data: AddMember) => void;
  onReset: () => void;
};
export default function MemberRegistrationForm({
  member,
  setField,
  onSave,
  onReset,
}: props) {
  const t = useTranslations("memberRegistration");

  return (
    <Card className="w-full max-w-xl h-auto mx-auto flex flex-col justify-between p-4">
      {/* ================= Personal Information ================= */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="fullName">
            {t("fields.fullName")}
            <span className="text-destructive">*</span>
          </Label>

          <Input
            id="fullName"
            value={member.name}
            required
            placeholder={t("placeholders.fullName")}
            onChange={(e) => setField("name", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="mobile">
            {t("fields.mobile")}
            <span className="text-destructive">*</span>
          </Label>

          <Input
            id="mobile"
            type="tel"
            required
            value={member.phone}
            placeholder={t("placeholders.mobile")}
            onChange={(e) => setField("phone", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">{t("fields.email")}</Label>

          <Input
            id="email"
            type="email"
            value={member.mail}
            placeholder={t("placeholders.email")}
            onChange={(e) => setField("mail", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dob">{t("fields.dob")}</Label>

          <Input
            id="dob"
            type="date"
            value={member.dob}
            onChange={(e) => setField("dob", e.target.value)}
          />
        </div>
      </div>

      {/* ================= KYC Information ================= */}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="aadhaar">{t("fields.aadhaar")}</Label>

          <Input
            id="aadhaar"
            value={member.aadhar}
            placeholder={t("placeholders.aadhaar")}
            onChange={(e) => setField("aadhar", e.target.value)}
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="document">{t("fields.document")}</Label>

          <Input
            id="document"
            type="file"
            accept="image/*,.pdf"
            onChange={(e) => {
              const file = e.target.files?.[0];

              if (!file) return;

              // Temporary: storing the filename.
              // Replace this after upload with the returned URL.
              setField("aadharImg", file.name);
            }}
          />
        </div>
      </div>

      {/* ================= Nominee Details ================= */}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="nomineeName">{t("fields.nomineeName")}</Label>
          <Input
            id="nomineeName"
            value={member.nomineeName ?? ""}
            placeholder={t("placeholders.nomineeName")}
            onChange={(e) => setField("nomineeName", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="relation">{t("fields.relation")}</Label>

          <Input
            id="relation"
            value={member.nomineeRelation ?? ""}
            placeholder={t("placeholders.relation")}
            onChange={(e) => setField("nomineeRelation", e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button
          variant="outline"
          className="w-full sm:w-auto"
          onClick={onReset}
        >
          Cancel
        </Button>

        <Button className="w-full sm:w-auto" onClick={() => onSave(member)}>
          Save Member
        </Button>
      </div>
    </Card>
  );
}

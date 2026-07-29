"use client";

import { Card } from "@app/components/ui/card";
import { Input } from "@app/components/ui/input";
import { Label } from "@app/components/ui/label";
import { AddMember } from "../../types/member.type";
import { Button } from "@/components/ui/Button";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  return (
    <Card className="w-full max-w-xl h-auto mx-auto flex flex-col justify-between p-4">
      {/* ================= Personal Information ================= */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="fullName">
            {t("memberRegistration.fields.fullName")}
            <span className="text-destructive">*</span>
          </Label>

          <Input
            id="fullName"
            value={member.name}
            required
            placeholder={t("memberRegistration.placeholders.fullName")}
            onChange={(e) => setField("name", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="mobile">
            {t("memberRegistration.fields.mobile")}
            <span className="text-destructive">*</span>
          </Label>

          <Input
            id="mobile"
            type="tel"
            required
            value={member.phone}
            placeholder={t("memberRegistration.placeholders.mobile")}
            onChange={(e) => setField("phone", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">{t("memberRegistration.fields.email")}</Label>

          <Input
            id="email"
            type="email"
            value={member.mail}
            placeholder={t("memberRegistration.placeholders.email")}
            onChange={(e) => setField("mail", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dob">{t("memberRegistration.fields.dob")}</Label>

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
          <Label htmlFor="aadhaar">
            {t("memberRegistration.fields.aadhaar")}
          </Label>

          <Input
            id="aadhaar"
            value={member.aadhar}
            placeholder={t("memberRegistration.placeholders.aadhaar")}
            onChange={(e) => setField("aadhar", e.target.value)}
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="document">
            {t("memberRegistration.fields.document")}
          </Label>

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
          <Label htmlFor="nomineeName">
            {t("memberRegistration.fields.nomineeName")}
          </Label>
          <Input
            id="nomineeName"
            value={member.nomineeName ?? ""}
            placeholder={t("memberRegistration.placeholders.nomineeName")}
            onChange={(e) => setField("nomineeName", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="relation">
            {t("memberRegistration.fields.relation")}
          </Label>

          <Input
            id="relation"
            value={member.nomineeRelation ?? ""}
            placeholder={t("memberRegistration.placeholders.relation")}
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

"use client";

import { useTranslations } from "next-intl";

import { CardContent, CardHeader, CardTitle } from "@app/components/ui/card";
import { Input } from "@app/components/ui/input";
import { Label } from "@app/components/ui/label";
import { Button } from "@app/components/ui/Button";
import { AddMember } from "../../types/member.type";

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
    <div className="w-full space-y-10">
      {/* ================= Personal Information ================= */}
      <section className="space-y-6">
        <CardHeader className="px-0">
          <CardTitle>{t("sections.personal.title")}</CardTitle>
          <p className="text-sm text-on-surface-variant">
            {t("sections.personal.description")}
          </p>
        </CardHeader>

        <CardContent className="px-0">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="fullName">{t("fields.fullName")}</Label>

              <Input
                id="fullName"
                value={member.name}
                placeholder={t("placeholders.fullName")}
                onChange={(e) => setField("name", e.target.value)}
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
              <Label htmlFor="mobile">{t("fields.mobile")}</Label>

              <Input
                id="mobile"
                type="tel"
                value={member.phone}
                placeholder={t("placeholders.mobile")}
                onChange={(e) => setField("phone", e.target.value)}
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
        </CardContent>
      </section>

      {/* ================= KYC Information ================= */}
      <section className="space-y-6">
        <CardHeader className="px-0">
          <CardTitle>{t("sections.kyc.title")}</CardTitle>
          <p className="text-sm text-on-surface-variant">
            {t("sections.kyc.description")}
          </p>
        </CardHeader>

        <CardContent className="px-0">
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
        </CardContent>
      </section>

      {/* ================= Nominee Details ================= */}
      <section className="space-y-6">
        <CardHeader className="px-0">
          <CardTitle>{t("sections.nominee.title")}</CardTitle>
          <p className="text-sm text-on-surface-variant">
            {t("sections.nominee.description")}
          </p>
        </CardHeader>

        <CardContent className="px-0">
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
        </CardContent>
      </section>

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
    </div>
  );
}

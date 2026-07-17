"use client";

import { useTranslations } from "next-intl";

import { CardContent, CardHeader, CardTitle } from "@app/components/ui/card";
import { Input } from "@app/components/ui/input";
import { Label } from "@app/components/ui/label";
import { Button } from "@app/components/ui/Button";
import { AddChit } from "@app/admin/types/chit.type";

type props = {
  chit: AddChit;
  setField: <K extends keyof AddChit>(field: K, value: AddChit[K]) => void;
  onSave: (data: AddChit) => void;
  onReset: () => void;
};
export default function CreateChitForm({
  chit,
  setField,
  onSave,
  onReset,
}: props) {
  const t = useTranslations("chitRegistration");

  return (
    <div className="w-full space-y-10">
      {/* ================= Personal Information ================= */}
      <section className="space-y-6">
        <CardHeader className="px-0">
          <CardTitle>{t("sections.basic.title")}</CardTitle>
          <p className="text-sm text-on-surface-variant">
            {t("sections.basic.description")}
          </p>
        </CardHeader>

        <CardContent className="px-0">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="fullName">{t("fields.name")}</Label>

              <Input
                id="fullName"
                value={chit.name}
                placeholder={t("placeholders.name")}
                onChange={(e) => setField("name", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{t("fields.total")}</Label>

              <Input
                id="total"
                inputMode="numeric"
                value={
                  chit.total === 0
                    ? ""
                    : new Intl.NumberFormat("en-IN", {
                        maximumFractionDigits: 0,
                      }).format(chit.total)
                }
                placeholder={t("placeholders.total")}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^\d]/g, "");

                  setField("total", value ? Number(value) : 0);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">{t("fields.duration")}</Label>

              <Input
                id="duration"
                type="numeric"
                value={chit.duration}
                placeholder={t("placeholders.duration")}
                onChange={(e) => setField("duration", Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="monthly">{t("fields.monthly")}</Label>

              <Input
                id="monthly"
                inputMode="numeric"
                value={
                  chit.monthly === 0
                    ? ""
                    : new Intl.NumberFormat("en-IN", {
                        maximumFractionDigits: 0,
                      }).format(chit.monthly)
                }
                placeholder={t("placeholders.monthly")}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^\d]/g, "");

                  setField("monthly", value ? Number(value) : 0);
                }}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="members">{t("fields.members")}</Label>

              <Input
                id="members"
                type="numeric"
                value={chit.members}
                placeholder={t("placeholders.members")}
                onChange={(e) => setField("members", Number(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="commission">{t("fields.commission")}</Label>

              <Input
                id="commission"
                type="numeric"
                value={chit.commision}
                placeholder={t("placeholders.commission")}
                onChange={(e) => setField("commision", Number(e.target.value))}
              />
            </div>
          </div>
        </CardContent>
      </section>
    </div>
  );
}

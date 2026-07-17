"use client";
import React, { useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { toBlob, toPng } from "html-to-image";
import { ReactTransliterate } from "react-transliterate";
export function CardForm() {
  const [text, setText] = useState("");
  const t = useTranslations();
  const previewRef = useRef<HTMLDivElement>(null);
  const exportRef = useRef<HTMLDivElement>(null);
  // 1. Live State Binding for the Passbook Image preview
  const [formData, setFormData] = useState({
    name: "Diwali seetu",
    groupNo: "G-01",
    cycleNo: "1",
    date: "2026-07-17",
    time: "9 PM",
    total: "10,00,000",
    auctioned: "10,000",
    due: "5,000",
    discount: "5,000",
  });

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleGenerateImage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!exportRef.current) return;

    try {
      // Wait until fonts are loaded
      await document.fonts.ready;

      // Wait until every image is loaded
      const images = Array.from(exportRef.current.querySelectorAll("img"));

      await Promise.all(
        images.map(
          (img) =>
            new Promise<void>((resolve) => {
              if (img.complete) return resolve();

              img.onload = () => resolve();
              img.onerror = () => resolve();
            }),
        ),
      );

      const blob = await toBlob(exportRef.current, {
        cacheBust: true,
        pixelRatio: 3,
        backgroundColor: "#ffffff",
      });

      if (!blob) return;

      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `Scheme-Card-${Date.now()}.png`;
      link.click();

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to export image:", error);
    }
  };

  return (
    <div className="space-y-8 max-w-xl mx-auto">
      {/* Input Form Module */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{t("cardForm.title")}</CardTitle>
          <CardDescription>{t("cardForm.description")}</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleGenerateImage} className="space-y-6">
            <FieldGroup className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="form-name">
                  {t("cardForm.fields.fullName")}
                </FieldLabel>
                <Input
                  id="form-name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder={t("cardForm.fields.fullNamePlaceholder")}
                  className="w-full"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="form-group">
                  {t("cardForm.fields.groupNo")}
                </FieldLabel>
                <Input
                  id="form-group"
                  value={formData.groupNo}
                  onChange={(e) => handleChange("groupNo", e.target.value)}
                  className="w-full"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="form-cycle">
                  {t("cardForm.fields.cycleNo")}
                </FieldLabel>
                <Input
                  id="form-cycle"
                  value={formData.cycleNo}
                  onChange={(e) => handleChange("cycleNo", e.target.value)}
                  type="text"
                  placeholder={t("cardForm.fields.cycleNoPlaceholder") || "0"}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="form-date">
                  {t("cardForm.fields.date")}
                </FieldLabel>
                <Input
                  id="form-date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleChange("date", e.target.value)}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="form-time">
                  {t("cardForm.fields.time")}
                </FieldLabel>
                <Input
                  id="form-time"
                  value={formData.time}
                  onChange={(e) => handleChange("time", e.target.value)}
                  placeholder={t("cardForm.fields.timePlaceholder")}
                  className="uppercase"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="form-total">
                  {t("cardForm.fields.total")}
                </FieldLabel>
                <Input
                  id="form-total"
                  value={formData.total}
                  onChange={(e) => handleChange("total", e.target.value)}
                  placeholder={t("cardForm.fields.totalPlaceholder")}
                />
              </Field>
            </FieldGroup>

            <FieldGroup className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="form-auctioned">
                  {t("cardForm.fields.auctionedAmount")}
                </FieldLabel>
                <Input
                  id="form-auctioned"
                  value={formData.auctioned}
                  onChange={(e) => handleChange("auctioned", e.target.value)}
                  placeholder={t("cardForm.fields.auctionedAmountPlaceholder")}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="form-due">
                  {t("cardForm.fields.duePayment")}
                </FieldLabel>
                <Input
                  id="form-due"
                  value={formData.due}
                  onChange={(e) => handleChange("due", e.target.value)}
                  placeholder={t("cardForm.fields.duePaymentPlaceholder")}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="form-discount">
                  {t("cardForm.fields.discountAmount")}
                </FieldLabel>
                <Input
                  id="form-discount"
                  value={formData.discount}
                  onChange={(e) => handleChange("discount", e.target.value)}
                  placeholder={t("cardForm.fields.discountAmountPlaceholder")}
                />
              </Field>
            </FieldGroup>

            <div className="pt-2">
              <Button type="submit" className="w-full">
                {t("cardForm.actions.submit")}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Visual Export Structure Canvas Element */}
      <div className="border-t border-dashed pt-6">
        <div
          ref={previewRef}
          className="w-full max-w-xl mx-auto bg-linear-to-tr from-slate-950 via-slate-900 to-indigo-950 text-white p-6 rounded-2xl shadow-2xl border border-slate-800/80"
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <span className="text-[10px] uppercase tracking-widest bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded font-semibold">
                Official Passbook
              </span>
              <h3 className="text-xl font-black mt-2 tracking-tight text-white">
                {formData.name || "—"}
              </h3>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase text-slate-500 tracking-wider">
                {t("cardForm.fields.groupNo")} / {t("cardForm.fields.cycleNo")}
              </p>
              <p className="text-sm font-mono font-bold text-indigo-300">
                {formData.groupNo || "—"} / #{formData.cycleNo || "0"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-3 my-4 bg-slate-900/40 p-4 rounded-xl border border-slate-800/40">
            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider font-medium">
                {t("cardForm.fields.total")}
              </p>
              <p className="text-base font-bold text-emerald-400">
                ₹{formData.total || "0"}
              </p>
            </div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider font-medium">
                {t("cardForm.fields.auctionedAmount")}
              </p>
              <p className="text-base font-bold text-amber-400">
                ₹{formData.auctioned || "0"}
              </p>
            </div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider font-medium">
                {t("cardForm.fields.duePayment")}
              </p>
              <p className="text-base font-bold text-rose-400">
                ₹{formData.due || "0"}
              </p>
            </div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider font-medium">
                {t("cardForm.fields.discountAmount")}
              </p>
              <p className="text-base font-bold text-sky-400">
                ₹{formData.discount || "0"}
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center text-[11px] text-slate-500 border-t border-slate-800/60 pt-3 mt-4">
            <p>
              {t("cardForm.fields.date")}: {formData.date || "—"} (
              {formData.time})
            </p>
            <h1 className="font-extrabold"> GPAY No. 86103888353</h1>

            <p className="tracking-widest font-mono text-[9px] uppercase opacity-40">
              Verified Receipt
            </p>
          </div>
        </div>
        <div
          className="fixed left-[-99999px] top-0 pointer-events-none"
          aria-hidden="true"
        >
          <div
            ref={exportRef}
            className="w-270 h-150 bg-linear-to-tr from-slate-950 via-slate-900 to-indigo-950 text-white p-14 "
          >
            <div className="flex justify-between items-start mb-12">
              <div>
                <span className="text-xl uppercase tracking-[6px] bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-5 py-2 rounded-full font-semibold">
                  Official Passbook
                </span>

                <h2 className="text-6xl font-black mt-6">
                  {formData.name || "—"}
                </h2>
              </div>
              <h1> ஓம் சாந்தி</h1>
              <div className="text-right">
                <p className="text-lg uppercase text-slate-400">
                  {t("cardForm.fields.groupNo")} /{" "}
                  {t("cardForm.fields.cycleNo")}
                </p>

                <p className="text-4xl font-bold text-indigo-300 mt-2">
                  {formData.groupNo} / #{formData.cycleNo}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 bg-slate-900/40 p-10 rounded-3xl">
              <div>
                <p className="text-lg uppercase text-slate-400">
                  {t("cardForm.fields.total")}
                </p>

                <p className="text-5xl font-bold text-emerald-400">
                  ₹{formData.total}
                </p>
              </div>

              <div>
                <p className="text-lg uppercase text-slate-400">
                  {t("cardForm.fields.auctionedAmount")}
                </p>

                <p className="text-5xl font-bold text-amber-400">
                  ₹{formData.auctioned}
                </p>
              </div>

              <div>
                <p className="text-lg uppercase text-slate-400">
                  {t("cardForm.fields.duePayment")}
                </p>

                <p className="text-5xl font-bold text-rose-400">
                  ₹{formData.due}
                </p>
              </div>

              <div>
                <p className="text-lg uppercase text-slate-400">
                  {t("cardForm.fields.discountAmount")}
                </p>

                <p className="text-5xl font-bold text-sky-400">
                  ₹{formData.discount}
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center border-t border-slate-700 mt-12 pt-8">
              <div>
                <p>
                  {t("cardForm.fields.date")}: {formData.date || "—"} (
                  {formData.time})
                </p>
              </div>
              <h1> GPAY No. 86103888353</h1>

              <div className="text-right">
                <p className="text-lg uppercase tracking-[6px] text-slate-500">
                  Verified Receipt
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useRef, useState } from "react";
import { toBlob } from "html-to-image";
import { useTranslations } from "next-intl";
import { Share2, Download, X, Loader2 } from "lucide-react";
import slugify from "slugify";
export interface CardFormData {
  name: string;
  groupNo: string;
  cycleNo: string;
  date: string;
  auction_amt: string;
  auction_winner: string;
  member_name: string;
  time: string;
  total: string;
  auctioned: string;
  phone: string;
  due: string;
  discount: string;
}

interface ShareCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: CardFormData;
}

export function ShareCardModal({
  isOpen,
  onClose,
  formData,
}: ShareCardModalProps) {
  const t = useTranslations();
  const exportRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  // Helper function to render the passbook element to a Blob
  const generateImageBlob = async (): Promise<Blob | null> => {
    if (!exportRef.current) return null;

    // Wait for fonts to load
    await document.fonts.ready;

    // Wait for external images inside the target to load
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

    return await toBlob(exportRef.current, {
      cacheBust: true,
      pixelRatio: 3,
      backgroundColor: "#020617", // slate-950
    });
  };
  console.log("FORMDATA", formData);
  // 1. Download Handler
  const handleDownload = async () => {
    try {
      setIsExporting(true);
      const blob = await generateImageBlob();
      if (!blob) return;

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${slugify(formData.member_name)}${slugify(formData.name) || "receipt"}.png`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download image:", error);
    } finally {
      setIsExporting(false);
    }
  };

  // 2. Web Share API Handler (Mobile / Supported Browsers)
  const handleNativeShare = async () => {
    try {
      setIsExporting(true);
      const blob = await generateImageBlob();
      if (!blob) return;

      const file = new File(
        [blob],
        `card-${slugify(formData.name)}-${formData.member_name}.png`,
        {
          type: "image/png",
        },
      );

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: `Passbook Receipt - ${formData.name}`,
          text: `Here is the passbook receipt for ${formData.name}.`,
          files: [file],
        });
      } else {
        // Fallback to simple download if files sharing isn't supported
        handleDownload();
      }
    } catch (error) {
      // Ignore AbortError when users cancel the native share drawer
      if ((error as Error).name !== "AbortError") {
        console.error("Error sharing image:", error);
      }
    } finally {
      setIsExporting(false);
    }
  };
  const formatShortDate = (dateString) => {
    if (!dateString) return "—";

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString; // Fallback if parsing fails

    return date.toLocaleDateString("en-US", {
      month: "short", // e.g. "Aug"
      day: "numeric", // e.g. "10"
      year: "numeric", // e.g. "2026"
    });
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      {/* Modal Dialog Box */}
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800 shrink-0">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Share2 className="w-5 h-5 text-indigo-400" /> Passbook Preview
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Visible Preview */}
        <div className="p-4 sm:p-6 overflow-y-auto">
          <div className="w-full max-w-xl mx-auto bg-linear-to-tr from-slate-950 via-slate-900 to-indigo-950 text-white p-6 rounded-2xl shadow-2xl border border-slate-800/80">
            {/* Top Letterhead Salutation */}
            <div className="flex items-center justify-center gap-3 mb-4 pt-1">
              <div className="h-px w-8 bg-indigo-500/30" />
              <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] text-indigo-200/70 uppercase select-none">
                Om Shanthi
              </span>
              <div className="h-px w-8 bg-indigo-500/30" />
            </div>

            {/* Header Row: Member Name & Cycle Number */}
            <div className="flex justify-between items-end mb-4">
              <div>
                <h3 className="text-xl font-black tracking-tight text-white mt-0.5">
                  {formData.name || "—"}
                </h3>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase text-slate-400 tracking-wider font-medium">
                  {t("cardForm.fields.cycleNo")}
                </p>
                <p className="text-sm font-mono font-bold text-indigo-300">
                  #{formData.cycleNo || "0"}
                </p>
              </div>
            </div>

            {/* Stats Grid */}
            <p> To : {formData.member_name}</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 my-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800/60 backdrop-blur-sm">
              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">
                  {t("cardForm.fields.total")}
                </p>
                <p className="text-base font-bold text-emerald-400 mt-0.5">
                  ₹{formData.total || "0"}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">
                  {t("cardForm.fields.auctionedAmount")}
                </p>
                <p className="text-base font-bold text-amber-400 mt-0.5">
                  ₹{formData.auctioned || "0"}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">
                  {t("cardForm.fields.auctionWinner")}
                </p>
                <p className="text-base font-bold text-amber-400 mt-0.5">
                  {formData.auction_winner || "0"}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">
                  {t("cardForm.fields.duePayment")}
                </p>
                <p className="text-base font-bold text-rose-400 mt-0.5">
                  ₹{formData.due || "0"}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">
                  {t("cardForm.fields.discountAmount")}
                </p>
                <p className="text-base font-bold text-sky-400 mt-0.5">
                  ₹{formData.discount || "0"}
                </p>
              </div>
            </div>

            {/* Footer Info */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-[11px] text-slate-400 border-t border-slate-800/80 pt-3 mt-4">
              <p className="font-medium">
                {t("cardForm.fields.date")}: {formatShortDate(formData.date)}{" "}
                {formData.time ? `(${formData.time})` : ""}
              </p>
              <h4 className="font-extrabold text-indigo-200 tracking-wide">
                GPAY No. 86103888353
              </h4>
              <p className="tracking-widest font-mono text-[9px] uppercase opacity-50">
                Verified Receipt
              </p>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex gap-3 p-4 border-t border-slate-800 bg-slate-900/50 shrink-0">
          <button
            onClick={handleDownload}
            disabled={isExporting}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors disabled:opacity-50"
          >
            {isExporting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            Download
          </button>

          <button
            onClick={handleNativeShare}
            disabled={isExporting}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-500 transition-colors disabled:opacity-50"
          >
            {isExporting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Share2 className="w-4 h-4" />
            )}
            Share Passbook
          </button>
        </div>
      </div>

      {/* Offscreen Canvas Node for High-Res HTML-to-Image Generation */}
      <div
        className="fixed left-[-99999px] top-0 pointer-events-none"
        aria-hidden="true"
      >
        {/* Offscreen Canvas Node for High-Res HTML-to-Image Generation */}
        {/* Offscreen Canvas Node for High-Res HTML-to-Image Generation */}
        <div
          className="fixed left-[-99999px] top-0 pointer-events-none"
          aria-hidden="true"
        >
          <div
            ref={exportRef}
            className="w-[1080px] h-[600px] bg-gradient-to-tr from-slate-950 via-slate-900 to-indigo-950 text-white p-10 border border-slate-800 flex flex-col justify-between"
          >
            {/* Top Header & Salutation */}
            <div>
              {/* Top Letterhead Invocation */}
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="h-px w-16 bg-indigo-500/30" />
                <span className="text-xl font-bold tracking-[0.3em] text-indigo-200/80 uppercase select-none">
                  Om Shanthi
                </span>
                <div className="h-px w-16 bg-indigo-500/30" />
              </div>

              {/* Member Info Header */}
              <div className="flex justify-between items-end">
                <div>
                  <h2 className="text-4xl font-black tracking-tight text-white">
                    {formData.name || "—"}
                  </h2>
                </div>

                <div className="text-right">
                  <p className="text-sm uppercase tracking-wider text-slate-400 font-medium">
                    {t("cardForm.fields.cycleNo")}
                  </p>
                  <p className="text-3xl font-bold text-indigo-300 font-mono mt-0.5">
                    #{formData.cycleNo || "0"}
                  </p>
                </div>
              </div>
            </div>

            {/* Recipient Line */}
            <div className="text-slate-300 font-medium text-lg mt-2">
              To :{" "}
              <span className="text-white font-bold">
                {formData.member_name || "—"}
              </span>
            </div>

            {/* Values Grid (Matches Preview) */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 bg-slate-900/50 p-6 rounded-2xl border border-slate-800/60 my-auto backdrop-blur-sm">
              <div>
                <p className="text-sm uppercase text-slate-400 font-semibold tracking-wider">
                  {t("cardForm.fields.total")}
                </p>
                <p className="text-3xl font-extrabold text-emerald-400 mt-0.5">
                  ₹{formData.total || "0"}
                </p>
              </div>

              <div>
                <p className="text-sm uppercase text-slate-400 font-semibold tracking-wider">
                  {t("cardForm.fields.auctionedAmount")}
                </p>
                <p className="text-3xl font-extrabold text-amber-400 mt-0.5">
                  ₹{formData.auctioned || "0"}
                </p>
              </div>

              <div>
                <p className="text-sm uppercase text-slate-400 font-semibold tracking-wider">
                  {t("cardForm.fields.auctionWinner")}
                </p>
                <p className="text-3xl font-extrabold text-amber-400 mt-0.5">
                  {formData.auction_winner || ""}
                </p>
              </div>

              <div>
                <p className="text-sm uppercase text-slate-400 font-semibold tracking-wider">
                  {t("cardForm.fields.duePayment")}
                </p>
                <p className="text-3xl font-extrabold text-rose-400 mt-0.5">
                  ₹{formData.due || "0"}
                </p>
              </div>

              <div>
                <p className="text-sm uppercase text-slate-400 font-semibold tracking-wider">
                  {t("cardForm.fields.discountAmount")}
                </p>
                <p className="text-3xl font-extrabold text-sky-400 mt-0.5">
                  ₹{formData.discount || "0"}
                </p>
              </div>
            </div>

            {/* Receipt Footer */}
            <div className="flex justify-between items-center border-t border-slate-800/80 pt-4 text-base text-slate-400">
              <p className="font-medium">
                {t("cardForm.fields.date")}: {formData.date || "—"}{" "}
                {formData.time ? `(${formData.time})` : ""}
              </p>
              <h1 className="text-lg font-black text-indigo-200 tracking-wide">
                GPAY No. 86103888353
              </h1>
              <p className="text-xs uppercase tracking-[4px] text-slate-500 font-mono font-medium">
                Verified Receipt
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

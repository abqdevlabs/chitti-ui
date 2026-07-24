"use client";

import React, { useRef, useState } from "react";
import { toBlob } from "html-to-image";
import { useTranslations } from "next-intl";
import { Share2, Download, X, Loader2 } from "lucide-react";

export interface CardFormData {
  name: string;
  groupNo: string;
  cycleNo: string;
  date: string;
  time: string;
  total: string;
  auctioned: string;
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

  // 1. Download Handler
  const handleDownload = async () => {
    try {
      setIsExporting(true);
      const blob = await generateImageBlob();
      if (!blob) return;

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Passbook-${formData.name || "receipt"}-${Date.now()}.png`;
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

      const file = new File([blob], `Passbook-${formData.name}.png`, {
        type: "image/png",
      });

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      {/* Modal Dialog Box */}
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800">
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
        <div className="p-6 overflow-y-auto">
          <div className="w-full max-w-xl mx-auto bg-gradient-to-tr from-slate-950 via-slate-900 to-indigo-950 text-white p-6 rounded-2xl shadow-2xl border border-slate-800/80">
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
                  {t("cardForm.fields.groupNo")} /{" "}
                  {t("cardForm.fields.cycleNo")}
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
              <h1 className="font-extrabold text-slate-300">
                GPAY No. 86103888353
              </h1>
              <p className="tracking-widest font-mono text-[9px] uppercase opacity-40">
                Verified Receipt
              </p>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex gap-3 p-4 border-t border-slate-800 bg-slate-900/50">
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

        {/* Offscreen Canvas Node for High-Res HTML-to-Image Generation */}
        <div
          className="fixed left-[-99999px] top-0 pointer-events-none"
          aria-hidden="true"
        >
          <div
            ref={exportRef}
            className="w-[1080px] h-[600px] bg-gradient-to-tr from-slate-950 via-slate-900 to-indigo-950 text-white p-14 border border-slate-800 flex flex-col justify-between"
          >
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xl uppercase tracking-[6px] bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-5 py-2 rounded-full font-semibold">
                  Official Passbook
                </span>
                <h2 className="text-6xl font-black mt-6 tracking-tight">
                  {formData.name || "—"}
                </h2>
              </div>
              <h1 className="text-3xl font-bold tracking-widest text-slate-300">
                ஓம் சாந்தி
              </h1>
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

            <div className="grid grid-cols-2 gap-8 bg-slate-900/40 p-10 rounded-3xl border border-slate-800/40 my-auto">
              <div>
                <p className="text-lg uppercase text-slate-400 font-medium">
                  {t("cardForm.fields.total")}
                </p>
                <p className="text-5xl font-bold text-emerald-400">
                  ₹{formData.total}
                </p>
              </div>
              <div>
                <p className="text-lg uppercase text-slate-400 font-medium">
                  {t("cardForm.fields.auctionedAmount")}
                </p>
                <p className="text-5xl font-bold text-amber-400">
                  ₹{formData.auctioned}
                </p>
              </div>
              <div>
                <p className="text-lg uppercase text-slate-400 font-medium">
                  {t("cardForm.fields.duePayment")}
                </p>
                <p className="text-5xl font-bold text-rose-400">
                  ₹{formData.due}
                </p>
              </div>
              <div>
                <p className="text-lg uppercase text-slate-400 font-medium">
                  {t("cardForm.fields.discountAmount")}
                </p>
                <p className="text-5xl font-bold text-sky-400">
                  ₹{formData.discount}
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center border-t border-slate-700 pt-8 text-xl text-slate-400">
              <p>
                {t("cardForm.fields.date")}: {formData.date || "—"} (
                {formData.time})
              </p>
              <h1 className="font-extrabold text-white">
                GPAY No. 86103888353
              </h1>
              <p className="text-lg uppercase tracking-[6px] text-slate-500 font-mono">
                Verified Receipt
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

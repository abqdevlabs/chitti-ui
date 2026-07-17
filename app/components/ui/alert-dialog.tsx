"use client";

import { useEffect } from "react";

import { Button } from "./Button";

type AlertModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "danger";
};

export default function AlertModal({
  open,
  onClose,
  onConfirm,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "default",
}: AlertModalProps) {
  // Close on ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (open) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* MODAL */}
      <div className="relative z-10 w-[90%] max-w-md rounded-xl bg-background p-6 shadow-xl border border-text/10">
        {/* TITLE */}
        <h2 className="text-lg font-semibold">{title}</h2>

        {/* DESCRIPTION */}
        <p className="text-sm text-secondarytext mt-2">{description}</p>

        {/* ACTIONS */}
        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={onClose}>
            {cancelText}
          </Button>

          <Button
            variant={variant === "danger" ? "default" : "default"}
            onClick={() => {
              onConfirm?.();
              onClose();
            }}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}

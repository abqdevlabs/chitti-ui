"use client";
import { useLanguage } from "@/i18n/LanguageContext";
import { LANGUAGES } from "@/i18n/languages";
import { useState } from "react";

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);

  // const languages = [
  //   { code: "en", label: "English" },
  //   { code: "ta", label: "தமிழ்" },
  // ];
  const languages = LANGUAGES;

  const current = languages.find((l) => l.code === language);

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          padding: "8px 12px",
          borderRadius: 8,
          border: "1px solid #ddd",
          background: "#fff",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 6,
          fontWeight: 500,
        }}
      >
        🌐 {current?.label}
        <span style={{ fontSize: 12 }}>▾</span>
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "110%",
            right: 0,
            background: "#fff",
            border: "1px solid #eee",
            borderRadius: 8,
            boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
            overflow: "hidden",
            zIndex: 10,
          }}
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setOpen(false);
              }}
              style={{
                padding: "10px 14px",
                width: "100%",
                textAlign: "left",
                background: language === lang.code ? "#f5f5f5" : "transparent",
                border: "none",
                cursor: "pointer",
                fontWeight: language === lang.code ? 600 : 400,
              }}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

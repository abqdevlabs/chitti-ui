// export type LanguageCode = "en" | "ta";
export type LanguageCode = (typeof LANGUAGES)[number]["code"];
export const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "ta", label: "தமிழ்" },
  { code: "hi", label: "தமிழ்" },
] as const;

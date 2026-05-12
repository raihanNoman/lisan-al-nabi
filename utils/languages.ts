import { getRandom } from "./get";

export const Languages: Language[] = ["en", "bn", "hi", "ur"];
export const LANGUAGE_INFO: Record<
  Language,
  { name: string; org: string; flag: string }
> = {
  en: { name: "English", org: "English", flag: "🇺🇸" },

  bn: { name: "Bengali", org: "বাংলা", flag: "🇧🇩" },

  hi: { name: "Hindi", org: "हिन्दी", flag: "🇮🇳" },

  ur: { name: "Urdu", org: "اردو", flag: "🇵🇰" },
};

export const useRandomLN = () => getRandom(Languages);

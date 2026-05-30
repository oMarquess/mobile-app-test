import type { Language } from "@/types/learning";

export const languages: Language[] = [
  {
    id: "es",
    name: "Spanish",
    nativeName: "Español",
    countryCode: "es",
    flagUrl: "https://flagcdn.com/w320/es.png",
  },
  {
    id: "fr",
    name: "French",
    nativeName: "Français",
    countryCode: "fr",
    flagUrl: "https://flagcdn.com/w320/fr.png",
  },
  {
    id: "ja",
    name: "Japanese",
    nativeName: "日本語",
    countryCode: "jp",
    flagUrl: "https://flagcdn.com/w320/jp.png",
  },
  {
    id: "de",
    name: "German",
    nativeName: "Deutsch",
    countryCode: "de",
    flagUrl: "https://flagcdn.com/w320/de.png",
  },
  {
    id: "zh",
    name: "Mandarin",
    nativeName: "普通话",
    countryCode: "cn",
    flagUrl: "https://flagcdn.com/w320/cn.png",
  },
];

export function getLanguageById(id: string): Language | undefined {
  return languages.find((lang) => lang.id === id);
}

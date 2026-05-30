import type { Unit } from "@/types/learning";

export const units: Unit[] = [
  // Spanish
  {
    id: "es-u1",
    languageId: "es",
    title: "Basics 1",
    description: "Greetings, introductions, and essential phrases",
    order: 1,
  },
  {
    id: "es-u2",
    languageId: "es",
    title: "Basics 2",
    description: "Numbers, colors, and everyday objects",
    order: 2,
  },

  // French
  {
    id: "fr-u1",
    languageId: "fr",
    title: "Basics 1",
    description: "Greetings, introductions, and essential phrases",
    order: 1,
  },
  {
    id: "fr-u2",
    languageId: "fr",
    title: "Basics 2",
    description: "Numbers, colors, and everyday objects",
    order: 2,
  },

  // Japanese
  {
    id: "ja-u1",
    languageId: "ja",
    title: "Basics 1",
    description: "Greetings, introductions, and essential phrases",
    order: 1,
  },
  {
    id: "ja-u2",
    languageId: "ja",
    title: "Basics 2",
    description: "Numbers, colors, and everyday objects",
    order: 2,
  },

  // German
  {
    id: "de-u1",
    languageId: "de",
    title: "Basics 1",
    description: "Greetings, introductions, and essential phrases",
    order: 1,
  },
  {
    id: "de-u2",
    languageId: "de",
    title: "Basics 2",
    description: "Numbers, colors, and everyday objects",
    order: 2,
  },

  // Mandarin
  {
    id: "zh-u1",
    languageId: "zh",
    title: "Basics 1",
    description: "Greetings, introductions, and essential phrases",
    order: 1,
  },
  {
    id: "zh-u2",
    languageId: "zh",
    title: "Basics 2",
    description: "Numbers, colors, and everyday objects",
    order: 2,
  },
];

export function getUnitsByLanguage(languageId: string): Unit[] {
  return units
    .filter((unit) => unit.languageId === languageId)
    .sort((a, b) => a.order - b.order);
}

export function getUnitById(id: string): Unit | undefined {
  return units.find((unit) => unit.id === id);
}

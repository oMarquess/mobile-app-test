export type Language = {
  id: string;
  name: string;
  nativeName: string;
  flagUrl: string;
  countryCode: string;
};

export type Unit = {
  id: string;
  languageId: string;
  title: string;
  description: string;
  order: number;
};

export type ActivityType = "vocabulary" | "phrase" | "quiz" | "ai-teacher";

export type VocabularyItem = {
  word: string;
  translation: string;
  pronunciation?: string;
  example?: string;
};

export type PhraseItem = {
  phrase: string;
  translation: string;
  pronunciation?: string;
};

export type Activity = {
  id: string;
  type: ActivityType;
  title: string;
  vocabulary?: VocabularyItem[];
  phrases?: PhraseItem[];
};

export type Lesson = {
  id: string;
  unitId: string;
  languageId: string;
  title: string;
  description: string;
  order: number;
  xpReward: number;
  goals: string[];
  aiTeacherPrompt?: string;
  activities: Activity[];
};

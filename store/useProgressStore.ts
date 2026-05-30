import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type ProgressStore = {
  xp: number;
  dailyGoal: number;
  streak: number;
  completedLessonIds: string[];
  inProgressLessonId: string | null;
  addXp: (amount: number) => void;
  resetDailyXp: () => void;
  completeLesson: (id: string) => void;
  setInProgressLesson: (id: string | null) => void;
};

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set) => ({
      xp: 15,
      dailyGoal: 20,
      streak: 12,
      completedLessonIds: ["es-u1-l1", "es-u1-l2"],
      inProgressLessonId: "es-u1-l3",
      addXp: (amount) =>
        set((state) => ({ xp: Math.min(state.xp + amount, state.dailyGoal) })),
      resetDailyXp: () => set({ xp: 0 }),
      completeLesson: (id) =>
        set((state) => ({
          completedLessonIds: state.completedLessonIds.includes(id)
            ? state.completedLessonIds
            : [...state.completedLessonIds, id],
          inProgressLessonId:
            state.inProgressLessonId === id ? null : state.inProgressLessonId,
        })),
      setInProgressLesson: (id) => set({ inProgressLessonId: id }),
    }),
    {
      name: "progress-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

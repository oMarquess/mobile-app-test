import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type ProgressStore = {
  xp: number;
  dailyGoal: number;
  streak: number;
  addXp: (amount: number) => void;
  resetDailyXp: () => void;
};

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set) => ({
      xp: 15,
      dailyGoal: 20,
      streak: 12,
      addXp: (amount) =>
        set((state) => ({ xp: Math.min(state.xp + amount, state.dailyGoal) })),
      resetDailyXp: () => set({ xp: 0 }),
    }),
    {
      name: "progress-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

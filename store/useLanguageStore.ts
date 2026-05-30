import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type LanguageStore = {
  selectedLanguageId: string | null;
  setSelectedLanguageId: (id: string) => void;
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
};

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      selectedLanguageId: null,
      setSelectedLanguageId: (id) => set({ selectedLanguageId: id }),
      _hasHydrated: false,
      setHasHydrated: (state) => set({ _hasHydrated: state }),
    }),
    {
      name: "language-store",
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

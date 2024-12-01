import { create } from "zustand";

interface Tab {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export const useTabStore = create<Tab>((set) => ({
  currentTab: "recommend",
  setCurrentTab: (tab) => set({ currentTab: tab }),
}));

import { create } from "zustand";

interface MonthlyStore {
  year: number;
  month: number;
  monthlySpend: string;
  setMonthlySpend: (spend: string) => void;
  updateDate: () => void;
}

export const useMonthlyStore = create<MonthlyStore>((set) => ({
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
  monthlySpend: "0",
  setMonthlySpend: (spend) => set({ monthlySpend: spend }),
  updateDate: () => {
    const today = new Date();
    set({
      year: today.getFullYear(),
      month: today.getMonth() + 1,
    });
  },
}));

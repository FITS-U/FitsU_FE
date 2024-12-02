import { create } from "zustand";

interface MonthlyStore {
  year: number;
  month: number;
  monthlySpend: string;
  selectedMonth: number;
  setSelectedMonth: (month: number) => void;
  setMonthlySpend: (spend: string) => void;
  updateDate: () => void;
  getNextOrPrevMonth: (direction: 'prev' | 'next') => void;
}

export const useMonthlyStore = create<MonthlyStore>((set) => ({
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
  monthlySpend: "0",
  selectedMonth: 0,
  setSelectedMonth: (month) => set({ month }),
  setMonthlySpend: (spend) => set({ monthlySpend: spend }),
  
  updateDate: () => {
    const today = new Date();
    set({
      year: today.getFullYear(),
      month: today.getMonth() + 1,
    });
  },

  getNextOrPrevMonth: (direction) => {
    set((state) => {
      let newMonth = state.month;
      let newYear = state.year;

      if (direction === 'prev') {
        newMonth -= 1;
        if (newMonth < 1) {
          newMonth = 12;
          newYear -= 1;
        }
      } else if (direction === 'next') {
        newMonth += 1;
        if (newMonth > 12) {
          newMonth = 1;
          newYear += 1;
        }
      }

      return { year: newYear, month: newMonth };
    });
  },
}));

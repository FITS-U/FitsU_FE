import { create } from "zustand";

interface MonthlyStore {
  year: number;
  month: number;
  monthlySpend: number;
  setMonthlySpend: (spend: number) => void;
  resetToCurrentDate: () => void;
  getNextOrPrevMonth: (direction: 'prev' | 'next') => void;
}

export const useMonthlyStore = create<MonthlyStore>((set) => ({
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
  monthlySpend: 0,
  setMonthlySpend: (spend) => set({ monthlySpend: spend }),
  
  resetToCurrentDate: () => {
    const today = new Date();
    set({
      year: today.getFullYear(),
      month: today.getMonth() + 1,
    });
  },

  getNextOrPrevMonth: (direction) => {
    set((state) => {
      const isPrev = direction === 'prev';
      const newMonth = isPrev ? state.month - 1 : state.month + 1;
      const newYear = 
        newMonth < 1 ? state.year - 1 : 
        newMonth > 12 ? state.year + 1 : 
        state.year;

      return {
        year: newYear,
        month: ((newMonth + 11) % 12) + 1, // 1~12 범위 유지
      };
    });
  },
}));

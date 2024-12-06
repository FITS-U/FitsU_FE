import { create } from "zustand";

interface MonthlySpendRecord {
  year: number;
  month: number;
  spend: number;
}

interface MonthlyStore {
  currentYear: number;
  currentMonth: number;
  monthlySpends: MonthlySpendRecord[];
  setMonthlySpend: (year: number, month: number, spend: number) => void;
  resetToCurrentDate: () => void;
  getNextOrPrevMonth: (direction: 'prev' | 'next') => void;
  getMonthlySpend: (year: number, month: number) => number | undefined;
}

export const useMonthlyStore = create<MonthlyStore>((set, get) => ({
  currentYear: new Date().getFullYear(),
  currentMonth: new Date().getMonth() + 1,
  monthlySpends: [],

  setMonthlySpend: (year, month, spend) => {
    set((state) => {
      const existingIndex = state.monthlySpends.findIndex(
        (record) => record.year === year && record.month === month
      );

      if (existingIndex !== -1) {
        // 기존 데이터가 있으면 업데이트
        const updatedSpends = [...state.monthlySpends];
        updatedSpends[existingIndex] = { year, month, spend };
        return { monthlySpends: updatedSpends };
      } else {
        // 없으면 새로 추가
        return {
          monthlySpends: [...state.monthlySpends, { year, month, spend }],
        };
      }
    });
  },
  
  resetToCurrentDate: () => {
    const today = new Date();
    set({
      currentYear: today.getFullYear(),
      currentMonth: today.getMonth() + 1,
    });
  },

  getNextOrPrevMonth: (direction) => {
    set((state) => {
      const isPrev = direction === 'prev';
      const newMonth = isPrev ? state.currentMonth - 1 : state.currentMonth + 1;
      const newYear = 
        newMonth < 1 ? state.currentYear - 1 : 
        newMonth > 12 ? state.currentYear + 1 : 
        state.currentYear;

      return {
        currentYear: newYear,
        currentMonth: ((newMonth + 11) % 12) + 1, // 1~12 범위 유지
      };
    });
  },

  getMonthlySpend: (year, month) => {
    const record = get().monthlySpends.find(
      (record: { year: number; month: number; }) => record.year === year && record.month === month
    );
    return record?.spend;
  },
}));

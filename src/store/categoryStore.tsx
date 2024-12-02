import { create } from "zustand";

interface CategoryState {
  categoryId: number;
  categoryName: string;
  totalSpending: string; // 문자열 형태의 지출 금액
}

interface CategoryStore {
  categories: CategoryState[];
  selectedCategory: CategoryState;
  setCategories: (categories: CategoryState[]) => void;
  setSelectedCategory: (selectedCategory: CategoryState) => void;
  getSortedCtgBySpending: () => CategoryState[];
  getLargestSpendingCtg: () => CategoryState;
}

export const useCategoryStore = create<CategoryStore>((set, get) => ({
  categories: [],
  selectedCategory: {
    categoryId: 0,
    categoryName: "",
    totalSpending: "0",
  },
  setCategories: (categories) => set({ categories }),
  setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
  
  // 지출 총액 기준으로 내림차순 정렬된 카테고리 목록 반환
  getSortedCtgBySpending: () => {
    const { categories } = get();
    return [...categories].sort((a, b) => {
      const spendingA = parseFloat(a.totalSpending.replace(/,/g, ''));
      const spendingB = parseFloat(b.totalSpending.replace(/,/g, ''));
      return spendingB - spendingA;
    });
  },

  // 지출이 가장 큰 카테고리를 첫 번째로 설정
  getLargestSpendingCtg: () => {
    const sortedCategories = get().getSortedCtgBySpending();
    return sortedCategories[0];
  },
}));

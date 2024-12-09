import { create } from "zustand";

interface CategoryState {
  categoryId: number;
  categoryName: string;
  totalSpending: number;
}

interface CategoryStore {
  categories: CategoryState[];
  selectedCategory: CategoryState;
  setCategories: (categories: CategoryState[]) => void;
  setSelectedCategory: (selectedCategory: CategoryState) => void;
  getLargestSpendingCtg: () => CategoryState;
}

export const useCategoryStore = create<CategoryStore>((set, get) => ({
  categories: [],
  selectedCategory: {
    categoryId: 0,
    categoryName: "",
    totalSpending: 0,
  },
  setCategories: (categories) => set({ categories }),
  setSelectedCategory: (selectedCategory) => set({ selectedCategory }),

  // 가장 첫 번째 카테고리를 반환 (서버에서 내림차순으로 정렬된 데이터)
  getLargestSpendingCtg: () => {
    const { categories } = get();
    return categories[0];
  },
}));

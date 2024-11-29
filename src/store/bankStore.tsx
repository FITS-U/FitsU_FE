import { create } from "zustand";

interface BankStore {
  selectedBankIds: number[];
  setSelectedBankIds: (ids: number[]) => void;
  toggleBankId: (id: number) => void;
  selectAllBanks: (ids: number[]) => void;
  deselectAllBanks: () => void;
}

export const useBankStore = create<BankStore>((set) => ({
  selectedBankIds: [],
  setSelectedBankIds: (ids) => set({ selectedBankIds: ids }),
  toggleBankId: (id) =>
    set((state) => ({
      selectedBankIds: state.selectedBankIds.includes(id)
        ? state.selectedBankIds.filter((bankId) => bankId !== id)
        : [...state.selectedBankIds, id],
    })),
  selectAllBanks: (ids) => set({ selectedBankIds: ids }),
  deselectAllBanks: () => set({ selectedBankIds: [] }),
}));
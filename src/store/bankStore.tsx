import { create } from "zustand";

interface Bank {
  bankId: number;
  bankName: string;
  imageUrl: string;
}

interface BankStore {
  banks: Bank[];
  selectedBankIds: number[];
  setBanks: (banks: Bank[]) => void;
  setSelectedBankIds: (ids: number[]) => void;
  toggleBankId: (id: number) => void;
  selectAllBanks: (ids: number[]) => void;
  deselectAllBanks: () => void;
  getSelectedBankNames: () => string[];
}

export const useBankStore = create<BankStore>((set, get) => ({
  banks: [],
  selectedBankIds: [],
  setBanks: (banks) => set({ banks }),
  setSelectedBankIds: (ids) => set({ selectedBankIds: ids }),
  toggleBankId: (id) =>
    set((state) => ({
      selectedBankIds: state.selectedBankIds.includes(id)
        ? state.selectedBankIds.filter((bankId) => bankId !== id)
        : [...state.selectedBankIds, id],
    })),
  selectAllBanks: (ids) => set({ selectedBankIds: ids }),
  deselectAllBanks: () => set({ selectedBankIds: [] }),
  getSelectedBankNames: () => {
    const { banks, selectedBankIds } = get();
    return banks
      .filter((bank) => selectedBankIds.includes(bank.bankId))
      .map((bank) => bank.bankName);
  },
}));

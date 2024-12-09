import { create } from "zustand";

interface BenefitCtgState {
  selectedBenefit: number | null;
  setSelectedBenefit: (id: number) => void;
}

export const useBenefitCtgStore = create<BenefitCtgState>((set) => ({
  selectedBenefit: null,
  setSelectedBenefit: (id) => set({ selectedBenefit: id }),
}));

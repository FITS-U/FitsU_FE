import { create } from "zustand";

interface BenefitState {
  benefitTitle: string;
  description: string;
  categoryId: number;
  categoryName: string;
}

interface CardDetailState {
  cardId: number;
  cardName: string;
  prevSales: string;
  annualFee: string;
  cardApplyUrl: string;
  imageUrl: string;
  benefits: BenefitState[];
}

interface CardDetailStore {
  card: CardDetailState;
  setCard: (card: CardDetailState) => void;
}

export const useCardDetailStore = create<CardDetailStore>((set) => ({
  card: {
    cardId: 0,
    cardName: "",
    prevSales: "",
    annualFee: "",
    cardApplyUrl: "",
    imageUrl: "",
    benefits: []
  },
  setCard: (card) => set({ card }),
}))
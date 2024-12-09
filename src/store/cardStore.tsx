import { create } from "zustand";

interface CardState {
  cardId: number;
  cardName: string;
  benefitTitle: string;
  categoryId: number;
}

interface CardStore {
  cards: CardState[];
  selectedCard: CardState;
  setCards: (cards: CardState[]) => void;
  setSelectedCard: (selectedCard: CardState) => void;
}

export const useCardStore = create<CardStore>((set) => ({
  cards: [],
  selectedCard: {
    cardId: 0,
    cardName: "",
    benefitTitle: "",
    categoryId: 0
  },
  setCards: (cards) => set({ cards }),
  setSelectedCard: (selectedCard) => set({ selectedCard })
}))
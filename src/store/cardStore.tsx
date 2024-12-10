import { create } from "zustand";

export interface CardState {
  cardId: number;
  cardName: string;
  benefitTitle: string;
  categoryId: number;
  imageUrl: string;
}

interface CardStore {
  cards: CardState[];
  selectedCard: CardState;
  setCards: (cards: CardState[]) => void;
  setSelectedCard: (selectedCard: CardState) => void;
}

const SESSION_KEY = "selectedCard";

export const useCardStore = create<CardStore>((set) => ({
  cards: [],
  selectedCard: (() => {
    if (typeof window !== "undefined") {
      const savedCard = sessionStorage.getItem(SESSION_KEY);
      return savedCard ? JSON.parse(savedCard) : { cardId: 0, cardName: "", benefitTitle: "", categoryId: 0 };
    }
    return { cardId: 0, cardName: "", benefitTitle: "", categoryId: 0 };
  })(),
  setCards: (cards) => set({ cards }),
  setSelectedCard: (selectedCard) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(selectedCard)); // 세션에 저장
    }
    set({ selectedCard });
  },
}));

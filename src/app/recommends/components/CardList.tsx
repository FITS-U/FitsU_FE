import { getAllCards } from "@/api/card";
import { useEffect } from "react";

export const CardList = () => {
  // 임시데이터
  const cards = [
    {cardId: 1, cardName: "신한카드", description: "10% 할인", categoryId: 1},
    {cardId: 2, cardName: "국민카드", description: "10% 할인", categoryId: 2},
    {cardId: 3, cardName: "우리카드", description: "10% 할인", categoryId: 3},
    {cardId: 4, cardName: "토뱅카드", description: "10% 할인", categoryId: 4},
    {cardId: 5, cardName: "하나카드", description: "10% 할인", categoryId: 5},
    {cardId: 6, cardName: "카카오카드", description: "10% 할인", categoryId: 6},
  ]

  useEffect(() => {
    const fetchCardList = async() => {
      try {
        const data = await getAllCards();
      } catch (error) {
        console.error("Failed to fetch card list:", error);
      }
    };
    fetchCardList();
  }, []);

  return (
    <div className="p-8">
      {cards.map((card, index) => (
        <div key={index} className="mb-5">
          <div className="flex items-center justify-start">
            <div className="w-10 h-16 bg-contrast-800"></div>
            <div className="ml-4 flex flex-col gap-y-1">
              <div className="text-xl font-semibold">{card.cardName}</div>
              <div>{card.description}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
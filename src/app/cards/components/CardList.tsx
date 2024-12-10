"use client";

import { getAllCards } from "@/api/card";
import { useBenefitCtgStore } from "@/store/benefitCtgStore";
import { CardState, useCardStore } from "@/store/cardStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const CardList = () => {
  const { cards, setCards, setSelectedCard } = useCardStore();
  const selectedBenefitCtgId = useBenefitCtgStore((state) => state.selectedBenefit);
  const router = useRouter();

  useEffect(() => {
    const fetchCardList = async() => {
      try {
        const data = await getAllCards();
        setCards(data);
      } catch (error) {
        console.error("Failed to fetch card list:", error);
      }
    };
    fetchCardList();
  }, []);

    // 선택된 카테고리에 따라 필터링하며 중복 제거
    const filteredCards = selectedBenefitCtgId
    ? cards
        .filter((card) => card.categoryId === selectedBenefitCtgId)
        .filter((card, index, self) => self.findIndex((c) => c.cardId === card.cardId) === index)
    : cards.filter((card, index, self) => self.findIndex((c) => c.cardId === card.cardId) === index);

    const handleCardClick = (card: CardState, index: number) => {
      console.log("cardId:",card.cardId);
      setSelectedCard(card);
      router.push(`/recommends/${index + 1}`);
    };

  return (
    <div className="px-8 pt-8">
      {filteredCards.map((card, index) => (
        <div key={index} className={`${index === filteredCards.length - 1 ? "" : "mb-5"}`}>
          <div 
            className="flex items-center justify-start cursor-pointer"
            onClick={() => handleCardClick(card, index)}
          >
            <img src={card.imageUrl} alt={`${card.cardName}`} width={40} height={60} />
            <div className="ml-4 flex flex-col gap-y-1">
              <div className="text-lg font-semibold truncate max-w-64">{card.cardName}</div>
              <div className="text-sm">{card.benefitTitle}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
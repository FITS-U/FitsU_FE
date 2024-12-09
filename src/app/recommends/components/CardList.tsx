import { getAllCards } from "@/api/card";
import { useBenefitCtgStore } from "@/store/benefitCtgStore";
import { useCardStore } from "@/store/cardStore";
import { useEffect } from "react";

export const CardList = () => {
  const { cards, setCards } = useCardStore();
  const selectedBenefitCtgId = useBenefitCtgStore((state) => state.selectedBenefit);

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

  // 선택된 카테고리에 따라 필터링
  const filteredCards = selectedBenefitCtgId
    ? cards.filter((card) => card.categoryId === selectedBenefitCtgId)
    : cards;

  return (
    <div className="px-8 pt-8">
      {filteredCards.map((card, index) => (
        <div key={index} className={`${index === filteredCards.length - 1 ? "" : "mb-5"}`}>
          <div className="flex items-center justify-start">
            <div className="w-10 h-16 bg-contrast-800"></div>
            <div className="ml-4 flex flex-col gap-y-1">
              <div className="text-xl font-semibold truncate max-w-64">{card.cardName}</div>
              <div>{card.benefitTitle}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
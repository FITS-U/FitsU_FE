import { getAllCards } from "@/api/card";
import { useEffect } from "react";

export const CardList = () => {

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
    <div>
      <div>카드 리스트</div>
    </div>
  );
};
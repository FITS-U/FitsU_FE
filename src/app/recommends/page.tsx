"use client"

import BottomNav from "@/components/BottomNav";
import RecCard from "./components/RecCard";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";
import { getRecommendModelData } from "@/api/model";
import { getCardImage } from "@/api/card";
import { Loading } from "@/components/Loading";

export interface RecCardData {
  cardId: number;
  cardName: string;
  details: string;
  repBenefits: string;
  reason: string;
  imageUrl: string;
  benefitTitle: string;
  categoryId: number;
}

const CardRecommends = () => {
  const { user } = useAuthStore();
  const [loading, setLoading] = useState<boolean>(true);
  const [recData, setRecData] = useState<RecCardData[]>([]);

  useEffect(() => {    
    const fetchRecommendCard = async () => {
      try {
        if (user.token) {
          const response = await getRecommendModelData(user.token);
          setRecData(response);
        }
      } catch (error) {
        console.log("Failed to fetch categories and cards:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecommendCard();
  }, [user.token]);

  useEffect(() => {
    if (recData.length > 0) {
      const fetchCardImages = async () => {
        try {
          const updatedRecData = await Promise.all(
            recData.map(async (card) => {
              const imageResponse = await getCardImage(card.cardId);
              return { ...card, imageUrl: imageResponse.imageUrl };
            })
          );
          setRecData(updatedRecData);
        } catch (error) {
          console.log("Failed to fetch card images:", error);
        }
      };
  
      fetchCardImages();
    }
  }, [recData.length]); 

  if (loading) return <Loading message={`${user.name}님의 소비에 꼭 맞는 카드를 찾는 중이에요`} size="text-lg" />;
  
  return (
    <div className="text-white relative h-screen overflow-hidden">
      <div className="overflow-y-auto scrollbar-hide max-h-[calc(100vh-80px)]">
        <div className="p-8">
          <h1 className="text-xl font-bold">{user.name}님 소비에 기반한 카드 추천</h1>
          <RecCard recData={recData} />
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default CardRecommends;
"use client";

import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";
import { PopUp } from "./PopUp";
import { getAdModelData } from "@/api/model";
import { Loading } from "@/components/Loading";

export const Advertisement = () => {
  const { user } = useAuthStore();
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const [adData, setAdData] = useState([
    { cardId: 1, adCopy1: "당신의 여행 꿈이 현실로! ✈️", adCopy2: "197 원더카드 LIVING으로 항공마일리지 쌓고 여행하세요!" },
    { cardId: 2, adCopy1: "아름다움도 스마트하게! 💖", adCopy2: "KB국민 와이즈카드로 뷰티 할인과 함께 나만의 스타일을 완성해보세요!" },
  ]);

  // useEffect(() => {
  //   const fetchAdModel = async() => {
  //     try {
  //       const response = await getAdModelData(user.token);
  //       setAdData(response);
  //     } catch (error) {
  //       console.error("Failed to fetch advertise data:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchAdModel();
  // }, [user.token]);

  // if (loading) return <Loading />
  
  return (
    <div className="mt-8">
      <div 
        className="w-full h-16 p-6 font-bold bg-contrast-800 rounded-2xl flex items-center cursor-pointer"
        onClick={() => setIsClicked(!isClicked)}
      >
        {user.name}님이 관심있을 만한 카드
      </div>
      {isClicked && (
        <PopUp onClose={() => setIsClicked(false)} adData={adData} loading={loading} />
      )}
    </div>
  );
};
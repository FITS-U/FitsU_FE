"use client";

import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";
import { PopUp } from "./PopUp";
import { getAdModelData } from "@/api/model";

export const Advertisement = () => {
  const { user } = useAuthStore();
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [adData, setAdData] = useState([
    {
      adCopy1: "쇼핑할 때마다 기분이 UP! 🛍️",
      adCopy2: "맛있는 외식과 달콤한 카페도 함께 즐겨요! 🍽️☕",
      card_id: 55,
      card_name: "삼성 iD PET 카드",
      image_url: "https://vertical.pstatic.net/vertical-cardad/creatives/SS/10184/SS_10184_20221004-224031_ver.png"
    },
    {
      adCopy1: "쇼핑은 더 즐겁게, 외식은 더 맛있게! 🛍️🍽️",
      adCopy2: "카페에서의 달콤한 순간, 납부도 스마트하게! ☕💳",
      card_id: 135,
      card_name: "KB국민 와이즈카드",
      image_url: "https://vertical.pstatic.net/vertical-cardad/creatives/KB/99/KB_99_20230308-153721_hor.png"
    }
  ]);

  useEffect(() => {
    const fetchAdModel = async() => {
      try {
        const response = await getAdModelData(user.token);
        setAdData(response);
      } catch (error) {
        console.error("Failed to fetch advertise data:", error);
      } 
    };
    fetchAdModel();
  }, [user.token]);
  
  return (
    <div className="mt-8">
      <div 
        className="w-full h-16 p-6 font-bold bg-contrast-800 rounded-2xl flex items-center cursor-pointer"
        onClick={() => setIsClicked(!isClicked)}
      >
        {user.name}님이 관심있을 만한 카드
      </div>
      {isClicked && (
        <PopUp onClose={() => setIsClicked(false)} adData={adData} />
      )}
    </div>
  );
};
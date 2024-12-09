"use client";

import { useAuthStore } from "@/store/authStore";
import { useState } from "react";
import { PopUp } from "./PopUp";

export const Advertisement = () => {
  const { user } = useAuthStore();
  const [isClicked, setIsClicked] = useState<boolean>(false);
  
  return (
    <div className="mt-8">
      <div 
        className="w-full h-16 p-6 font-bold bg-contrast-800 rounded-2xl flex items-center cursor-pointer"
        onClick={() => setIsClicked(!isClicked)}
      >
        {user.name}님이 관심있을 만한 카드
      </div>
      {isClicked && (
        <PopUp onClose={() => setIsClicked(false)} />
      )}
    </div>
  );
};
"use client"

import BottomNav from "@/components/BottomNav";
import RecCard from "./components/RecCard";
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";

const CardRecommends = () => {
  const { user, hydrateUser } = useAuthStore();

  useEffect(() => {
    hydrateUser();
  }, [user.name])
  
  return (
    <div className="text-white relative h-screen overflow-hidden">
      <div className="overflow-y-auto scrollbar-hide max-h-[calc(100vh-150px)]">
        <div className="p-8">
          <h1 className="text-xl font-bold">{user.name}님 소비에 기반한 카드 추천</h1>
          <RecCard />
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default CardRecommends;
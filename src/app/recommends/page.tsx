"use client"

import BottomNav from "@/components/BottomNav";
import RecCard from "./components/RecCard";
import { SwitchTabs } from "./components/SwitchTabs";
import { useTabStore } from "@/store/tabStore";
import { ScrollBenefits } from "./components/ScrollBenefits";
import { useAuthStore } from "@/store/authStore";
import { CardList } from "./components/CardList";

const CardRecommends = () => {
  const { user } = useAuthStore();
  const currentTab = useTabStore((state) => state.currentTab);
  
  return (
    <div className="text-white relative h-screen overflow-hidden">
      <SwitchTabs />
      <div className="overflow-y-auto scrollbar-hide max-h-[calc(100vh-195px)]">
        {currentTab === "recommend" ? (
          <div className="p-8">
            <h1 className="text-lg font-bold">{user.name}님 소비에 맞는 카드</h1>
            <RecCard />
          </div>
        ) : (
          <div className="mt-8">
            <ScrollBenefits />
            <CardList />
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
};

export default CardRecommends;
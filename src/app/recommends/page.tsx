"use client"

import BottomNav from "@/components/BottomNav";
import RecCard from "./components/RecCard";
import { SwitchTabs } from "./components/SwitchTabs";
import { useTabStore } from "@/store/tabStore";

const CardRecommends = () => {
  const currentTab = useTabStore((state) => state.currentTab);
  const userName = "김송하";
  
  return (
    <div className="p-8 text-white relative h-screen">
      <SwitchTabs />
      <div className="mt-20">
        {currentTab === "recommend" ? (
          <div>
            <h1 className="text-lg font-bold">{userName}님 소비에 맞는 카드</h1>
            <RecCard />
          </div>
        ) : (
          <div>
            혜택 별 카드 보기
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
};

export default CardRecommends;
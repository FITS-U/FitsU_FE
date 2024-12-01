"use client"

import BottomNav from "@/components/BottomNav";
import RecCard from "./components/RecCard";
import { SwitchTabs } from "./components/SwitchTabs";
import { useTabStore } from "@/store/tabStore";
import { FaChevronDown } from "react-icons/fa";

const CardRecommends = () => {
  const currentTab = useTabStore((state) => state.currentTab);
  const userName = "김송하";

  // 임시데이터
  const categories = [
    { id: 1, name: "항공마일리지" },
    { id: 2, name: "쇼핑" },
    { id: 3, name: "간편결제" },
    { id: 4, name: "포인트/캐시백" },
    { id: 5, name: "편의점" },
    { id: 6, name: "대형마트" },
    { id: 7, name: "카페/베이커리" },
    { id: 8, name: "납부 혜택" },
    { id: 9, name: "외식" },
    { id: 10, name: "의료" },
    { id: 11, name: "반려동물" },
    { id: 12, name: "뷰티" },
    { id: 13, name: "대중교통" },
    { id: 14, name: "주유" },
    { id: 15, name: "하이패스" },
    { id: 16, name: "교육" },
    { id: 17, name: "육아" },
    { id: 18, name: "문화" },
    { id: 19, name: "레저" },
    { id: 20, name: "영화" },
    { id: 21, name: "통신" },
    { id: 22, name: "관리비" },
    { id: 23, name: "Priority Pass" },
    { id: 24, name: "프리미엄" },
    { id: 25, name: "오토" },
    { id: 26, name: "금융" },
    { id: 27, name: "체크카드겸용" },
    { id: 28, name: "바우처" },
    { id: 29, name: "언제나할인" },
    { id: 30, name: "렌탈" },
    { id: 31, name: "경차유류환급" },
    { id: 32, name: "연회비지원" },
    { id: 33, name: "국민행복카드" },
    { id: 34, name: "그린카드" },
  ];
  
  return (
    <div className="text-white relative h-screen overflow-hidden">
      <SwitchTabs />
      <div className="overflow-y-auto scrollbar-hide max-h-[calc(100vh-195px)]">
        {currentTab === "recommend" ? (
          <div className="p-8">
            <h1 className="text-lg font-bold">{userName}님 소비에 맞는 카드</h1>
            <RecCard />
          </div>
        ) : (
          <div className="mt-8">
            <div className="flex overflow-x-auto scrollbar-hide gap-3 mr-0">
              <div  className="ml-8">
                <div className="inline-flex h-10 px-4 min-w-20 whitespace-nowrap bg-white rounded-full items-center justify-center">
                  <div className="flex items-center justify-center text-black text-sm font-semibold">
                    혜택보기 <FaChevronDown className="h-3 ml-1" />
                  </div>
                </div>
              </div>
              {categories.map((category) => (
                <div key={category.id}>
                  <div className="inline-flex h-10 px-4 min-w-20 whitespace-nowrap bg-white rounded-full items-center justify-center">
                    <div className="text-black text-sm font-semibold">{category.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
};

export default CardRecommends;
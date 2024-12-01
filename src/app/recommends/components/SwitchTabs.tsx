import { useTabStore } from "@/store/tabStore";

export const SwitchTabs = () => {
  const { currentTab, setCurrentTab } = useTabStore();

  return (
    <div className="absolute w-full -left-0 border-b border-contrast-500">
      <div className="flex items-center justify-between">
        <div className="w-2/4 flex items-end justify-end">
          <div 
            className={`w-5/6 flex items-center justify-center cursor-pointer 
              ${currentTab === "recommend" ? "border-b-2" : ""}`}
            onClick={() => setCurrentTab("recommend")}
          >
            <span className="my-2">카드 추천</span>
          </div>
        </div>
        <div className="w-2/4 flex items-start justify-start">
          <div 
            className={`w-5/6 flex items-center justify-center cursor-pointer
              ${currentTab === "benefits" ? "border-b-2" : ""}`}
            onClick={() => setCurrentTab("benefits")}
          >
            <span className="my-2">혜택별 카드 보기</span>
          </div>
        </div>
      </div>
    </div>
  );
};
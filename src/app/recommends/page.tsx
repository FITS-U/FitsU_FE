import BottomNav from "@/components/BottomNav";
import RecCard from "./components/RecCard";

const CardRecommends = () => {
  const userName = "김송하";
  
  return (
    <div className="p-8 text-white relative">
      <h1 className="text-lg font-bold">{userName}님 소비에 맞는 카드</h1>
      <RecCard />
      <BottomNav />
    </div>
  );
};

export default CardRecommends;
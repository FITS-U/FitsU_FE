import BottomNav from "@/components/BottomNav";
import { ScrollBenefits } from "./components/ScrollBenefits";
import { CardList } from "./components/CardList";

const Cards = () => {
  return (
    <div className="text-white relative h-screen overflow-hidden">
      <div className="overflow-y-auto scrollbar-hide max-h-[calc(100vh-90px)]">
        <div className="absolute w-full bg-black">
          <div className="flex flex-col items-center justify-center text-xl font-semibold px-8 my-7">
            관심있는 혜택 별로 카드를 찾아보세요!
          </div>
          <div className="mx-[-32px] flex bg-contrast-700 border border-contrast-300"></div>
        </div>
        <ScrollBenefits />
        <CardList />
      </div>
      <BottomNav />
    </div>
  );
};

export default Cards;
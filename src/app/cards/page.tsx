import BottomNav from "@/components/BottomNav";
import { ScrollBenefits } from "./components/ScrollBenefits";
import { CardList } from "./components/CardList";

const Cards = () => {
  return (
    <div className="pt-8 text-white relative h-screen overflow-hidden">
      <div className="overflow-y-auto scrollbar-hide max-h-[calc(100vh-120px)]">
        <ScrollBenefits />
        <CardList />
      </div>
      <BottomNav />
    </div>
  );
};

export default Cards;
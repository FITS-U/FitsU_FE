import DailySpending from "@/components/DailySpending";
import TopSpendingCategory from "./components/TopSpendingCategory";
import Link from "next/link";

const MySpend = () => {
  return (
  <div className="text-white p-8">
    <div className="font-semibold">11월</div>
    <div className="text-2xl font-semibold">300,000원</div>
    <Link href="/my-spend/categories">
      <TopSpendingCategory name="식비" iconSrc="/icons/food.png"/>
    </Link>
    <DailySpending date="15" dayName="금요일" />
    <DailySpending date="14" dayName="목요일" />
    <DailySpending date="10" dayName="일요일" />
  </div>);
}

export default MySpend;
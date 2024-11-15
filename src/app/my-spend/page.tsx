import DailySpending from "./components/DailySpending";
import TopSpendingCategory from "./components/TopSpendingCategory";
import Link from "next/link";

const MySpend = () => {
  return (
  <div className="text-white p-8">
    <div className="font-semibold">11월</div>
    <div className="text-2xl font-semibold">300,000원</div>
    <Link href="/categories"><TopSpendingCategory/></Link>
    <DailySpending />
    <DailySpending />
    <DailySpending />
  </div>);
}

export default MySpend;
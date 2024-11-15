import DailySpending from "./components/DailySpending";
import TopSpendingCategory from "./components/TopSpendingCategory";

const Consumption = () => {
  return (
  <div className="text-white p-8">
    <div className="font-semibold">11월</div>
    <div className="text-2xl font-semibold">300,000원</div>
    <TopSpendingCategory/>
    <DailySpending />
    <DailySpending />
    <DailySpending />
  </div>);
}

export default Consumption;
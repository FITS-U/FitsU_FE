import { useFormatPrice } from "@/hooks/useFormatPrice";
import { useMonthlyStore } from "@/store/monthlyStore";
import { GoTriangleLeft, GoTriangleRight } from "react-icons/go";

export const MonthlyInfo = () => {
  const { month, monthlySpend, getNextOrPrevMonth } = useMonthlyStore();

  const handlePrevMonth = () => {
    getNextOrPrevMonth('prev');
  }

  const handleNextMonth = () => {
    getNextOrPrevMonth('next');
  }  

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <GoTriangleLeft 
          onClick={handlePrevMonth}
          className="w-6 h-6 text-contrast-400 cursor-pointer hover:text-contrast-200"
        />
        <div className="font-semibold">{month}월</div>
        <GoTriangleRight 
          onClick={handleNextMonth}
          className="w-6 h-6 text-contrast-400 cursor-pointer hover:text-contrast-200"
        />
      </div>
      <div className="text-2xl font-semibold">{useFormatPrice(monthlySpend)}원</div>
    </div>
  );
}
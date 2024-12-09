import { formatPrice } from "@/utils/formatPrice";
import { useMonthlyStore } from "@/store/monthlyStore";
import { GoTriangleLeft, GoTriangleRight } from "react-icons/go";

export const MonthlyInfo = () => {
  const { monthlySpends, currentYear, currentMonth, getNextOrPrevMonth } = useMonthlyStore();

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
        <div className="font-semibold">{currentMonth}월</div>
        <GoTriangleRight 
          onClick={handleNextMonth}
          className="w-6 h-6 text-contrast-400 cursor-pointer hover:text-contrast-200"
        />
      </div>
      {monthlySpends.map((monthly, index) => (
        <div key={index}>
          {monthly.year === currentYear && monthly.month === currentMonth && (
            <div className="text-2xl font-semibold">
              {formatPrice(monthly.spend)}원
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
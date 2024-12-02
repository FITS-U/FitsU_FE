import { useFormatPrice } from "@/hooks/useFormatPrice";
import { useMonthlyStore } from "@/store/monthlyStore";
import { GoTriangleLeft, GoTriangleRight } from "react-icons/go";

export const MonthlyInfo = () => {
  const { month, monthlySpend } = useMonthlyStore();
  const {} = useFormatPrice(monthlySpend);

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <GoTriangleLeft className="w-6 h-6 text-contrast-400" />
        <div className="font-semibold">{month}월</div>
        <GoTriangleRight className="w-6 h-6 text-contrast-400" />
      </div>
      <div className="text-2xl font-semibold">{useFormatPrice(monthlySpend)}원</div>
    </div>
  );
}
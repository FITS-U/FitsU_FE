import { formatPrice } from "@/utils/formatPrice";
import { FaChevronRight } from "react-icons/fa";

interface EachCategoryProps {
  name: string;
  percent: string;
  totalAmount: number;
}

const EachCategory = ({ name, percent, totalAmount }: EachCategoryProps) => {
  return (
    <div className="mt-6 flex items-center justify-between text-sm">
      <div className="flex items-center justify-between">
        <span className="ml-4">
          <div className="text-lg font-semibold">{name}</div>
          <div>{percent}% | {formatPrice(totalAmount)}원</div>
        </span>
      </div>
        <FaChevronRight className="w-3 h-3" />
    </div>
  );
};

export default EachCategory;
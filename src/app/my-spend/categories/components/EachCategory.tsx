import { CategoryIconsMini } from "@/icons/mapping";
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
        <div>
          <div>
            {CategoryIconsMini[name as keyof typeof CategoryIconsMini] || null}
          </div>
        </div>
        <div className="ml-3">
          <div className="text-lg font-semibold">{name}</div>
          <div>{percent}% | {formatPrice(totalAmount)}원</div>
        </div>
      </div>
        <FaChevronRight className="w-3 h-3" />
    </div>
  );
};

export default EachCategory;
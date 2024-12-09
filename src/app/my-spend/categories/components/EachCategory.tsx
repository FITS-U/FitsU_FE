import CategoryLogo from "@/components/CategoryLogo";
import { formatPrice } from "@/utils/formatPrice";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";

interface EachCategoryProps {
  index: number;
  name: string;
  percent: string;
  totalAmount: number;
  iconSrc: string;
}

const EachCategory = ({ index, name, percent, totalAmount, iconSrc }: EachCategoryProps) => {
  return (
    <div className="mt-6 flex items-center justify-between text-sm">
      <div className="flex items-center justify-between">
        {/* <CategoryLogo w={45} h={45} iconSrc={iconSrc} name={name} /> */}
        <span className="ml-4">
          <div>{name}</div>
          <div>{percent}% | {formatPrice(totalAmount)}원</div>
        </span>
      </div>
      <Link href={`/my-spend/categories/${index}`}>
        <FaChevronRight className="w-5 h-5" />
      </Link>
    </div>
  );
};

export default EachCategory;
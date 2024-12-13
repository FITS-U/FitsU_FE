import { CategoryIconsBig } from "@/icons/mapping";
import { useCategoryStore } from "@/store/categoryStore";
import { FaChevronRight } from "react-icons/fa";

const TopSpendingCategory = () => {
  const { getLargestSpendingCtg } = useCategoryStore();
  const largestCategory = getLargestSpendingCtg();

  return (
    <div className="bg-contrast-800 w-56 mt-5 p-5 rounded-[16px] text-sm">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div>이 달의 최고 소비</div>
          <div className="text-orange-500 text-base font-semibold">{largestCategory ? largestCategory.categoryName : "없음"}</div>
          <div className="flex items-center">더 보기 <FaChevronRight className="h-3 ml-1" /></div>
        </div>
        <div>
          {CategoryIconsBig[largestCategory.categoryName as keyof typeof CategoryIconsBig] || null}
        </div>
      </div>
    </div>
  );
};

export default TopSpendingCategory;
import { useCategoryStore } from "@/store/categoryStore";
import { FaChevronRight } from "react-icons/fa";
import Image from "next/image";

const TopSpendingCategory = () => {
  const { getLargestSpendingCtg } = useCategoryStore();
  const largestCategory = getLargestSpendingCtg();

  return (
    <div className="bg-contrast-800 w-60 mt-5 p-5 rounded-[16px] flex items-center justify-between text-sm">
      <span className="space-y-1">
        <div>이 달의 최고 소비</div>
        <div className="text-orange-500 text-base font-semibold">{largestCategory ? largestCategory.categoryName : "없음"}</div>
        <div className="flex items-center">더 보기 <FaChevronRight className="h-3 ml-1" /></div>
      </span>
        {/* <Image width={50} height={50} src={iconSrc} alt={`${name} 카테고리 로고`}/> */}
    </div>
  );
};

export default TopSpendingCategory;
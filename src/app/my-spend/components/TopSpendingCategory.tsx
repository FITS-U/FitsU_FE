import { useCategoryStore } from "@/store/categoryStore";
import Image from "next/image";

const TopSpendingCategory = () => {
  const { getLargestSpendingCtg } = useCategoryStore();

  return (
    <div className="bg-contrast-800 w-60 mt-5 p-5 rounded-[16px] flex items-center justify-between">
      <span>
        <div>이 달의 최고 소비</div>
        <div>{getLargestSpendingCtg.name}</div>
        <div>더 보기 &gt;</div>
      </span>
        {/* <Image width={50} height={50} src={iconSrc} alt={`${name} 카테고리 로고`}/> */}
    </div>
  );
};

export default TopSpendingCategory;
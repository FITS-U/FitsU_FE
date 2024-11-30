import Image from "next/image";

interface TopSpendingCategoryProps {
  name: string;
  iconSrc: string;
}

const TopSpendingCategory = ({name, iconSrc} : TopSpendingCategoryProps) => {
  return (
    <div className="bg-contrast-800 w-60 mt-5 p-5 rounded-[16px] flex items-center justify-between">
      <span>
        <div>이 달의 최고 소비</div>
        <div>{name}</div>
        <div>더 보기 &gt;</div>
      </span>
        <Image width={50} height={50} src={iconSrc} alt={`${name} 카테고리 로고`}/>
    </div>
  );
};

export default TopSpendingCategory;
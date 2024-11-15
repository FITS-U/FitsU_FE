import Image from "next/image";

interface EachCategoryProps {
  name: string;
  percentage: string;
  amount: string;
  iconSrc: string;
}

const EachCategory = ({ name, percentage, amount, iconSrc }: EachCategoryProps) => {
  return (
    <div className="mt-7 flex items-center justify-between text-sm">
      <div className="flex items-center justify-between">
        <Image width={45} height={45} src={iconSrc} alt={`${name} 카테고리 로고`}/>
        <span className="ml-4">
          <div>{name}</div>
          <div>{percentage}% | {amount}원</div>
        </span>
      </div>
      <span className="text-lg">&gt;</span>
    </div>
  );
};

export default EachCategory;
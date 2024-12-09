import CategoryLogo from "@/components/CategoryLogo";

interface EachCategoryProps {
  name: string;
  percent: string;
  totalAmount: number;
  iconSrc: string;
}

const EachCategory = ({ name, percent, totalAmount, iconSrc }: EachCategoryProps) => {
  return (
    <div className="mt-6 flex items-center justify-between text-sm">
      <div className="flex items-center justify-between">
        <CategoryLogo w={45} h={45} iconSrc={iconSrc} name={name} />
        <span className="ml-4">
          <div>{name}</div>
          <div>{percent}% | {totalAmount}원</div>
        </span>
      </div>
      <span className="text-lg">&gt;</span>
    </div>
  );
};

export default EachCategory;
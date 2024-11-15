import Image from "next/image";

const TopSpendingCategory = () => {
  return (
    <div className="bg-box-color w-60 mt-5 p-5 rounded-[16px] flex items-center justify-between">
      <span>
        <div>이 달의 최고 소비</div>
        <div>쇼핑</div>
        <div>더 보기 &gt;</div>
      </span>
        <Image width={50} height={50} src="/icons/shopping.png" alt="쇼핑 카테고리 로고"/>
    </div>
  );
};

export default TopSpendingCategory;
import Image from "next/image";

const EachCategory = () => {
  return (
    <div className="mt-7 flex items-center justify-between text-sm">
      <div className="flex items-center justify-between">
        <Image width={45} height={45} src="/icons/shopping.png" alt="쇼핑 카테고리 로고"/>
        <span className="ml-4">
          <div>쇼핑</div>
          <div>37.4% | 40,300원</div>
        </span>
      </div>
      <span className="text-lg">&gt;</span>
    </div>
  );
};

export default EachCategory;
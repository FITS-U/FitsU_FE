import Link from "next/link";
import EachCategory from "./components/EachCategory";

const Categories = () => {
  return (
    <div className="px-8 py-4 text-white">
      <Link href="/my-spend" className="text-3xl">&lt;</Link>
      <div className="my-4 text-lg font-bold">카테고리별 소비</div>
      <EachCategory name="식비" percentage="44.63" amount="127,900" iconSrc="/icons/food.png" />
      <EachCategory name="교통" percentage="20.94" amount="60,000" iconSrc="/icons/transport.png" />
      <EachCategory name="쇼핑" percentage="14.06" amount="40,300" iconSrc="/icons/shopping.png" />
      <EachCategory name="카페" percentage="13.12" amount="37,600" iconSrc="/icons/cafe.png" />
      <EachCategory name="취미" percentage="7.26" amount="20,800" iconSrc="/icons/hobby.png" />
    </div>
  );
};

export default Categories;
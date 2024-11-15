import Link from "next/link";
import EachCategory from "./components/EachCategory";

const Categories = () => {
  return (
    <div className="px-8 py-4 text-white">
      <Link href="/my-spend" className="text-3xl">&lt;</Link>
      <div className="my-4 text-lg font-bold">카테고리별 소비</div>
      <Link href="/my-spend/categories/food">
        <EachCategory name="식비" percentage="44.63" amount="127,900" iconSrc="/icons/food.png" />
      </Link>
      <Link href="/my-spend/categories/transport">
        <EachCategory name="교통" percentage="20.94" amount="60,000" iconSrc="/icons/transport.png" />
      </Link>
      <Link href="/my-spend/categories/shopping">
        <EachCategory name="쇼핑" percentage="14.06" amount="40,300" iconSrc="/icons/shopping.png" />
      </Link>
      <Link href="/my-spend/categories/cafe">
        <EachCategory name="카페" percentage="13.12" amount="37,600" iconSrc="/icons/cafe.png" />
      </Link>
      <Link href="/my-spend/categories/hobby">
        <EachCategory name="취미" percentage="7.26" amount="20,800" iconSrc="/icons/hobby.png" />
      </Link>
    </div>
  );
};

export default Categories;
import Link from "next/link";
import EachCategory from "./components/EachCategory";

const Categories = () => {
  return (
    <div className="px-8 py-4 text-white">
      <Link href="/my-spend" className="text-3xl">&lt;</Link>
      <div className="my-4 text-lg font-bold">카테고리별 소비</div>
      <Link href="/my-spend/categories/food">
        <EachCategory name="식비" percent="44.63" totalAmount="127,900" iconSrc="/icons/food.png" />
      </Link>
      <Link href="/my-spend/categories/transport">
        <EachCategory name="교통" percent="20.94" totalAmount="60,000" iconSrc="/icons/transport.png" />
      </Link>
      <Link href="/my-spend/categories/shopping">
        <EachCategory name="쇼핑" percent="14.06" totalAmount="40,300" iconSrc="/icons/shopping.png" />
      </Link>
      <Link href="/my-spend/categories/cafe">
        <EachCategory name="카페" percent="13.12" totalAmount="37,600" iconSrc="/icons/cafe.png" />
      </Link>
      <Link href="/my-spend/categories/hobby">
        <EachCategory name="취미" percent="7.26" totalAmount="20,800" iconSrc="/icons/hobby.png" />
      </Link>
    </div>
  );
};

export default Categories;
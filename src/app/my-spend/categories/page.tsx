import Link from "next/link";
import EachCategory from "./components/EachCategory";

const Categories = () => {
  return (
    <div className="px-8 py-4 text-white">
      <Link href="/my-spend" className="text-3xl">&lt;</Link>
      <div className="my-4 text-lg font-bold">카테고리별 소비</div>
      <EachCategory />
      <EachCategory />
      <EachCategory />
      <EachCategory />
      <EachCategory />
    </div>
  );
};

export default Categories;
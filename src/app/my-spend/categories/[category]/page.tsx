"use client"

import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";
import { CtgSpendingDetail } from "./components/CtgSpendingDetail";

const CategoryPage = () => {
  return (
    <div className="p-8 text-white">
      <div className="flex items-center justify-between">
        <Link href="/my-spend/categories">
          <FaChevronLeft className="w-5 h-5" />
        </Link>
        <span>소비 카테고리</span><span />
      </div>
      <CtgSpendingDetail />
    </div>
  );
};

export default CategoryPage;
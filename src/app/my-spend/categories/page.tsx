"use client";

import Link from "next/link";
import EachCategory from "./components/EachCategory";
import { FaChevronLeft } from "react-icons/fa";
import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { useMonthlyStore } from "@/store/monthlyStore";
import { getMthlySpendOfCtg } from "@/api/transaction";
import { useCategoryStore } from "@/store/categoryStore";

const Categories = () => {
  const { user } = useAuthStore();
  const { currentYear, currentMonth, getMonthlySpend } = useMonthlyStore();
  const { categories, setCategories, setSelectedCategory } = useCategoryStore();
  
  useEffect(() => {
    const fetchCtgSpending = async() => {
      try {
        const data = await getMthlySpendOfCtg(user.token, currentYear, currentMonth);
        setCategories(data);
      } catch (error) {
        console.error("Failed to fatch all category:", error);
      }
    };
    fetchCtgSpending();
  }, [currentYear, currentMonth]);

  const totalSpending = getMonthlySpend(currentYear, currentMonth);

  return (
    <div className="p-8 text-white">
      <div className="flex items-center justify-between mb-8">
        <Link href="/my-spend">
          <FaChevronLeft className="w-5 h-5" />
        </Link>
        <div className="tracking-tighter">카테고리별 소비</div>
        <div></div>
      </div>
      {categories.map((ctg, index) => {
        // 퍼센트 계산
        let percent = "0";
        if (totalSpending) {
          percent = totalSpending > 0
          ? ((ctg.totalSpending / totalSpending) * 100).toFixed(2)
          : "0";
        }

        return (
          <div key={index}>
            <Link href="" onClick={() => setSelectedCategory(ctg)}>
              <EachCategory index={index + 1} name={ctg.categoryName} percent={percent} totalAmount={ctg.totalSpending} iconSrc="" />
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Categories;
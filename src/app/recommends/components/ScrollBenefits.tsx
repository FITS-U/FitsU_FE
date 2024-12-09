"use client"

import { getCategories, saveLogDatas } from "@/api/category";
import { Category } from "@/app/register/components/ForRegister";
import { Loading } from "@/components/Loading";
import { useAuthStore } from "@/store/authStore";
import { useBenefitCtgStore } from "@/store/benefitCtgStore";
import { useEffect, useRef, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export const ScrollBenefits = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false);
  const { selectedBenefit, setSelectedBenefit } = useBenefitCtgStore();
  const scrollRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { user } = useAuthStore();

  useEffect(() => {
    const fetchCategories = async() => {
      try {
        const data = await getCategories();
        setCategories(data);

        // 첫 번째 카테고리를 기본 선택값으로 설정
        if (data.length > 0) {
          setSelectedBenefit(data[0].categoryId);
        }
      } catch (error) {
        console.error("Failed to fetch category list:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <Loading />

  const toggleDropDown = () => setIsDropDownOpen(!isDropDownOpen);

  const handleSelectBenefit = (id: number) => {
    setSelectedBenefit(id);
    setIsDropDownOpen(false);

    // 해당 카테고리를 가운데로 스크롤
    const selectedIndex = categories.findIndex((cat) => id === cat.categoryId);
    scrollRefs.current[selectedIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });

    // 카테고리 클릭 시 로그데이터 저장
    async() => {
      try {
        await saveLogDatas(id, "click", user.token);
      } catch (error) {
        console.error("Failed to post log data:", error);
      }
    }
  };

  return (
    <div>
      <div className="flex overflow-x-auto scrollbar-hide gap-3 mr-0">
        <div className="ml-8">
          <div 
            onClick={toggleDropDown}
            className="inline-flex h-10 px-4 min-w-20 whitespace-nowrap bg-white rounded-full items-center justify-center cursor-pointer"
          >
            <div className="flex items-center justify-center text-black text-sm font-semibold">
              혜택보기 
              {isDropDownOpen ? <FaChevronUp className="h-3 ml-1" /> : <FaChevronDown className="h-3 ml-1" />}
            </div>
          </div>

          {/* 드롭다운 메뉴 */}
          {isDropDownOpen && (
            <div className="absolute mt-3 flex shadow-lg rounded-lg z-10 h-full overflow-y-auto max-h-[550px] text-black scrollbar-hide">
              <div className="grid grid-cols-3 gap-1 items-center justify-center">
                {categories.map((category) => (
                  <div
                    key={category.categoryId}
                    onClick={() => handleSelectBenefit(category.categoryId)}
                    className="flex items-center justify-center text-center p-2 cursor-pointer hover:bg-orange-500 hover:border-current rounded-md border bg-white"
                  >
                    {category.categoryName}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 카테고리 버튼 */}
        {categories.map((category, index) => (
          <div 
            key={category.categoryId}
            ref={(el) => { scrollRefs.current[index] = el; }}
          >
            <div 
              onClick={() => setSelectedBenefit(category.categoryId)}
              className={`inline-flex h-10 px-4 min-w-20 whitespace-nowrap rounded-full items-center justify-center cursor-pointer ${category.categoryId === selectedBenefit ? "bg-orange-500" : "bg-white"}`}
            >
              <div className="text-black text-sm font-semibold">{category.categoryName}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
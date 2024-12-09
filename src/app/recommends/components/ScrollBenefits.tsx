"use client"

import { getCategories } from "@/api/category";
import { Category } from "@/app/register/components/ForRegister";
import { Loading } from "@/components/Loading";
import { useEffect, useRef, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export const ScrollBenefits = () => {
  // 임시데이터
  const category = [
    { id: 1, name: "항공마일리지" },
    { id: 2, name: "쇼핑" },
    { id: 3, name: "간편결제" },
    { id: 4, name: "포인트/캐시백" },
    { id: 5, name: "편의점" },
    { id: 6, name: "대형마트" },
    { id: 7, name: "카페/베이커리" },
    { id: 8, name: "납부 혜택" },
    { id: 9, name: "외식" },
    { id: 10, name: "의료" },
    { id: 11, name: "반려동물" },
    { id: 12, name: "뷰티" },
    { id: 13, name: "대중교통" },
    { id: 14, name: "주유" },
    { id: 15, name: "하이패스" },
    { id: 16, name: "교육" },
    { id: 17, name: "육아" },
    { id: 18, name: "문화" },
    { id: 19, name: "레저" },
    { id: 20, name: "영화" },
    { id: 21, name: "통신" },
    { id: 22, name: "관리비" },
    { id: 23, name: "Priority Pass" },
    { id: 24, name: "프리미엄" },
    { id: 25, name: "오토" },
    { id: 26, name: "금융" },
    { id: 27, name: "체크카드겸용" },
    { id: 28, name: "바우처" },
    { id: 29, name: "언제나할인" },
    { id: 30, name: "렌탈" },
    { id: 31, name: "경차유류환급" },
    { id: 32, name: "연회비지원" },
    { id: 33, name: "국민행복카드" },
    { id: 34, name: "그린카드" },
  ];
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false);
  const [selectedBenefit, setSelectedBenefit] = useState(categories[0].categoryId);
  const scrollRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const fetchCategories = async() => {
      try {
        const data = await getCategories();
        setCategories(data);
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
    const selectedIndex = categories.findIndex((cat) => cat.categoryId === id);
    scrollRefs.current[selectedIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
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
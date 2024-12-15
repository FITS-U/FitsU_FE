"use client";

import { CategoryIconsMini } from "@/icons/mapping";
import { useTransactionStore } from "@/store/transactionStore";
import { formatTransactionPrice } from "@/utils/formatPrice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";

const EditCategory = () => {
  const { selectedTransaction } = useTransactionStore();
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const rounter = useRouter();

  const handleCategorySelect = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
  };

  const categories = [
    { categoryId: 1, categoryName: "항공마일리지" },
    { categoryId: 2, categoryName: "쇼핑" },
    { categoryId: 3, categoryName: "간편결제" },
    { categoryId: 4, categoryName: "포인트/캐시백" },
    { categoryId: 5, categoryName: "편의점" },
    { categoryId: 6, categoryName: "대형마트" },
    { categoryId: 7, categoryName: "카페/베이커리" },
    { categoryId: 8, categoryName: "납부 혜택" },
    { categoryId: 9, categoryName: "외식" },
    { categoryId: 10, categoryName: "의료" },
    { categoryId: 11, categoryName: "반려동물" },
    { categoryId: 12, categoryName: "뷰티" },
    { categoryId: 13, categoryName: "대중교통" },
    { categoryId: 14, categoryName: "주유" },
    { categoryId: 15, categoryName: "하이패스" },
    { categoryId: 16, categoryName: "교육" },
    { categoryId: 17, categoryName: "육아" },
    { categoryId: 18, categoryName: "문화" },
    { categoryId: 19, categoryName: "레저" },
    { categoryId: 20, categoryName: "영화" },
    { categoryId: 21, categoryName: "통신" },
    { categoryId: 22, categoryName: "관리비" },
    { categoryId: 23, categoryName: "Priority Pass" },
    { categoryId: 24, categoryName: "프리미엄" },
    { categoryId: 25, categoryName: "오토" },
    { categoryId: 26, categoryName: "금융" },
    { categoryId: 27, categoryName: "체크카드겸용" },
    { categoryId: 28, categoryName: "바우처" },
    { categoryId: 29, categoryName: "언제나할인" },
    { categoryId: 30, categoryName: "렌탈" },
    { categoryId: 31, categoryName: "경차유류환급" },
    { categoryId: 32, categoryName: "연회비지원" },
    { categoryId: 33, categoryName: "국민행복카드" },
    { categoryId: 34, categoryName: "그린카드" },
  ];

  return (
    <div className="p-8 text-white relative h-screen overflow-hidden">
      <FaChevronLeft onClick={() => rounter.back()} />
      <div className="font-bold text-xl my-8">변경할 카테고리를 선택해주세요</div>
      <div className="flex items-center">
        <div>
          {CategoryIconsMini[selectedTransaction.categoryName as keyof typeof CategoryIconsMini] || null}
        </div>
        <div className="ml-2 space-y-1">
          <div className="text-xl font-medium">
            {formatTransactionPrice(selectedTransaction.price, selectedTransaction.transactionType)} 원
          </div>
          <div className="text-sm text-contrast-200">
            {selectedTransaction.recipient} | {selectedTransaction.userCardId ? selectedTransaction.cardName : selectedTransaction.accName}
          </div>
        </div>
      </div>
      <div className="mx-[-32px] mt-8 bg-contrast-800 h-4"></div>
      <div className="mt-4 overflow-y-auto scrollbar-hide max-h-[calc(100vh-330px)]">
        {categories.map((ctg) => (
          <div
            key={ctg.categoryId}
            className="flex items-center justify-between mb-4 cursor-pointer"
            onClick={() => handleCategorySelect(ctg.categoryId)}
          >
            <div className="flex items-center">
              <div>
                {CategoryIconsMini[ctg.categoryName as keyof typeof CategoryIconsMini] || null}
              </div>
              <div className="ml-2">
                {ctg.categoryName}
              </div>
            </div>
            <FaCheck 
              className={`text-xl ${selectedCategoryId === ctg.categoryId ? "text-orange-500" : "text-black"}`}
            />
          </div>
        ))}
      </div>
      <div className="absolute block bottom-4 w-full -left-0">
        <div className="px-6">
          <button 
            className={`p-4 w-full x-2 font-bold rounded-2xl text-black ${selectedCategoryId ? "bg-orange-500" : "bg-contrast-600 cursor-not-allowed"}`}
            disabled={!selectedCategoryId}
            // onClick={} post
          >
            변경하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCategory;
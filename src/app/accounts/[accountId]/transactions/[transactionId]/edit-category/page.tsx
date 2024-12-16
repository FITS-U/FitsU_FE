"use client";

import { editCategory, getCategories } from "@/api/category";
import { CategoryIconsMini } from "@/icons/mapping";
import { useAuthStore } from "@/store/authStore";
import { useCategoryStore } from "@/store/categoryStore";
import { useTransactionStore } from "@/store/transactionStore";
import { formatTransactionPrice } from "@/utils/formatPrice";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";

const EditCategory = () => {
  const { user, hydrateUser } = useAuthStore();
  const { selectedTransaction } = useTransactionStore();
  const { categories, setCategories, selectedCategory, setSelectedCategory } = useCategoryStore();
  const router = useRouter();
  const { accountId } = useParams();

  useEffect(() => {
    hydrateUser();

    const fetchCategories = async() => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.log("Failed to fetch categories:", error);
      }
    }
    fetchCategories();
  }, [hydrateUser, setCategories]);

  const handleClick = async() => {
    try {
      await editCategory(
        user.token,
        selectedTransaction.transactionId,
        selectedCategory.categoryId,
        selectedCategory.categoryName
      );
      router.push(`/accounts/${accountId}`);
    } catch (error) {
      console.log("Failed to edit category:", error);
    }
  };

  return (
    <div className="p-8 text-white relative h-screen overflow-hidden">
      <FaChevronLeft onClick={() => router.back()} />
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
            onClick={() => setSelectedCategory(ctg)}
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
              className={`text-xl ${selectedCategory.categoryId === ctg.categoryId ? "text-orange-500" : "text-black"}`}
            />
          </div>
        ))}
      </div>
      <div className="absolute block bottom-4 w-full -left-0">
        <div className="px-6">
          <button 
            className={`p-4 w-full x-2 font-bold rounded-2xl text-black ${selectedCategory.categoryId ? "bg-orange-500" : "bg-contrast-600 cursor-not-allowed"}`}
            disabled={!selectedCategory.categoryId}
            onClick={handleClick}
          >
            변경하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCategory;
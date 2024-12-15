import { getCtgSpendDetails } from "@/api/transaction";
import { useAuthStore } from "@/store/authStore";
import { useCategoryStore } from "@/store/categoryStore";
import { useMonthlyStore } from "@/store/monthlyStore";
import { useTransactionStore } from "@/store/transactionStore";
import { useEffect } from "react";
import { CtgTransactions } from "./CtgTransactions";
import { formatPrice } from "@/utils/formatPrice";
import { CategoryIconsBig } from "@/icons/mapping";

export const CtgSpendingDetail = () => {  
  const { user, hydrateUser } = useAuthStore();
  const { currentYear, currentMonth } = useMonthlyStore();
  const { selectedCategory } = useCategoryStore();
  const { transactions, setTransactions } = useTransactionStore();

  useEffect(() => {
    hydrateUser();

    const fetchCtgSpendingDetail = async() => {
      try {
        if (user.token) {
          const data = await getCtgSpendDetails(user.token, selectedCategory.categoryId, currentYear, currentMonth);
          setTransactions(data);
        }
      } catch (error) {
        console.error("Failed to fetch spending detail of category:", error);
      }
    };
    fetchCtgSpendingDetail();
  }, [selectedCategory, currentYear, currentMonth, user.token, hydrateUser, setTransactions]);

  return (
    <div>
      <div className="flex items-center justify-between mt-24">
        <div>
          <div className="text-md mb-2">{currentMonth}월 {selectedCategory.categoryName} 총 금액</div>
          <div className="text-3xl font-semibold">{formatPrice(selectedCategory.totalSpending)}원</div>
        </div>
        <div>
          {CategoryIconsBig[selectedCategory.categoryName as keyof typeof CategoryIconsBig] || null}
        </div>
      </div>
      <div className="mt-8 bg-contrast-800 rounded-2xl p-2 w-16 text-sm flex items-center justify-center">
        <p>총 {transactions.length}회</p>
      </div>
      <div className="mt-8 mx-[-32px] flex bg-contrast-800 h-4"></div>
      <section className="mt-8">
        {transactions.length
          ? <CtgTransactions />
          : <div className="flex items-center justify-center mt-32">소비 내역이 존재하지 않습니다.</div>
        }
      </section>
    </div>
  );
};
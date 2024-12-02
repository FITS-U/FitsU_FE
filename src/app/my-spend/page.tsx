"use client"

import DailySpending from "@/components/DailySpending";
import TopSpendingCategory from "./components/TopSpendingCategory";
import Link from "next/link";
import { useTransactionStore } from "@/store/transactionStore";
import { useMonthlyStore } from "@/store/monthlyStore";
import { useEffect, useState } from "react";
import { getAllTransactions, getMthlySpendOfCtg } from "@/api/transaction";
import { useAuthStore } from "@/store/authStore";
import { Loading } from "@/components/Loading";
import { useFormatPrice } from "@/hooks/useFormatPrice";
import { useCategoryStore } from "@/store/categoryStore";
import { MonthlyInfo } from "./components/MonthlyInfo";

const MySpendPage = () => {
  const { user } = useAuthStore();
  const { transactions, setTransactions } = useTransactionStore();
  const { year, month, monthlySpend } = useMonthlyStore();
  const { setCategories } = useCategoryStore();
  const {} = useFormatPrice(monthlySpend);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAllTransactions = async () => {
      try {
        const [transacData, ctgData] = await Promise.allSettled([
          getAllTransactions(user.token),
          getMthlySpendOfCtg(user.token, year, month)
        ]);

        if (transacData.status === "fulfilled") {
          setTransactions(transacData.value);
        } else {
          console.error("모든 거래 내역 불러오기 실패: ", transacData.reason);
        }

        if (ctgData.status === "fulfilled") {
          setCategories(ctgData.value);
        } else {
          console.error("카테고리별 지출액 불러오기 실패: ", ctgData.reason);
        }
      } catch (error) {
        console.log("Failed to fetch all transaction of user", error);
      } finally {
        setLoading(false);
      }
    }
    fetchAllTransactions();
  }, [user.token, setTransactions, monthlySpend, setCategories, year, month]);

  if (loading) {
    return <Loading />
  }

  return (
    <div className="text-white p-8">
      {/* 월 소비 정보 */}
      <MonthlyInfo />

      {/* 카테고리 링크 */}
      <Link href="/my-spend/categories">
        <TopSpendingCategory />
      </Link>

      {/* 일별 소비 데이터 */}
      {transactions.map((transaction) => (
        <DailySpending
          key={transaction.transactionId}
          date={new Date(transaction.createdAt).getDate()} // 날짜 계산
          dayName={new Intl.DateTimeFormat("ko-KR", { weekday: "long" }).format(
            new Date(transaction.createdAt)
          )} // 요일 계산
        />
      ))}
    </div>
  );
}

export default MySpendPage;
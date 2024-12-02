"use client"

import TopSpendingCategory from "./components/TopSpendingCategory";
import Link from "next/link";
import { useTransactionStore } from "@/store/transactionStore";
import { useMonthlyStore } from "@/store/monthlyStore";
import { useEffect, useState } from "react";
import { getAllTransactions, getMthlySpendOfCtg } from "@/api/transaction";
import { useAuthStore } from "@/store/authStore";
import { Loading } from "@/components/Loading";
import { useCategoryStore } from "@/store/categoryStore";
import { MonthlyInfo } from "./components/MonthlyInfo";
import BottomNav from "@/components/BottomNav";
import { Transaction } from "@/types/account";
import { useFormatDateByDayName } from "@/hooks/useFormatDate";
import { useFormatTransactionPrice } from "@/hooks/useFormatPrice";
import Calendar from "./components/Calender";

const MySpendPage = () => {
  const { user } = useAuthStore();
  const { transactions, setTransactions } = useTransactionStore();
  const { year, month } = useMonthlyStore();
  const { setCategories } = useCategoryStore();
  const [loading, setLoading] = useState<boolean>(true);

  const [expenses, setExpenses] = useState<Record<number, number>>({
    1: -20000,
    2: 15000,
    3: -3000,
    4: 5000,
    6: 7000,
  });

  useEffect(() => {
    const fetchAllTransactions = async () => {
      try {
        const [transacData, ctgData] = await Promise.allSettled([
          getAllTransactions(user.token),
          getMthlySpendOfCtg(user.token, year, month),
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
    };
    fetchAllTransactions();
  }, [user.token, setTransactions, setCategories, year, month]);

  if (loading) {
    return <Loading />;
  }

  // 현재 월에 해당하는 거래만 필터링
  const filteredTransactions = transactions.filter(
    (transaction) => new Date(transaction.createdAt).getMonth() + 1 === month
  );

  // 일별로 거래 내역 그룹화 함수
  const groupTransactionsByDate = (transactions: Transaction[]) => {
    return transactions.reduce((groups: Record<string, Transaction[]>, transaction) => {
      const date = useFormatDateByDayName(transaction.createdAt);
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(transaction);
      return groups;
    }, {});
  };

  const groupedByDate = groupTransactionsByDate(filteredTransactions);

  return (
    <div className="text-white p-8 relative h-screen overflow-hidden">
      <div className="overflow-y-auto scrollbar-hide max-h-[calc(100vh-100px)]">
        <BottomNav />
        {/* 월 소비 정보 */}
        <MonthlyInfo />

        {/* 카테고리 링크 */}
        <Link href="/my-spend/categories">
          <TopSpendingCategory />
        </Link>

        <div className="mt-8 flex flex-col items-center justify-center">
          <Calendar month={month} year={year} expenses={expenses} />
        </div>

        {/* 월별 -> 일별 소비 데이터 */}
        {Object.entries(groupedByDate).map(([date, dailyTransactions]) => (
          <div key={date} className="mt-8">
            <div className="text-sm font-semibold mb-6 text-contrast-200">{date}</div>
            {dailyTransactions.map((transaction) => (
              <div key={transaction.transactionId} className="mb-6">
                <div className="font-bold text-lg">
                  {useFormatTransactionPrice(transaction.price, transaction.transactionType)}
                </div>
                <div className="text-xs text-contrast-200">
                  {transaction.recipient} | {transaction.userCardId ? transaction.cardName : transaction.accName}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MySpendPage;

"use client";

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
import { formatDateByDayName } from "@/utils/formatDate";
import { formatTransactionPrice } from "@/utils/formatPrice";
import Calendar from "./components/Calender";

const MySpendPage = () => {
  const { user } = useAuthStore();
  const { transactions, setTransactions } = useTransactionStore();
  const { year, month } = useMonthlyStore();
  const { setCategories } = useCategoryStore();
  const [loading, setLoading] = useState(true);
  const [expenses, setExpenses] = useState<Record<number, number>>({});
  const [groupedByDate, setGroupedByDate] = useState<Record<string, Transaction[]>>({});

  useEffect(() => {
    const fetchAllTransactions = async () => {
      try {
        setLoading(true);
        const [transacData, ctgData] = await Promise.allSettled([
          getAllTransactions(user.token),
          getMthlySpendOfCtg(user.token, year, month),
        ]);

        if (transacData.status === "fulfilled") {
          setTransactions(transacData.value);
        }
        if (ctgData.status === "fulfilled") {
          setCategories(ctgData.value);
        }
      } catch (error) {
        console.error("데이터 페칭 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllTransactions();
  }, [user.token, year, month, setTransactions, setCategories]);

  useEffect(() => {
    // 거래 내역 필터링
    const filteredTransactions = transactions.filter(
      (transaction) => new Date(transaction.createdAt).getMonth() + 1 === month
    );

    // 일별 소비 데이터 집계
    const expensesData: Record<number, number> = {};
    const groupedData: Record<string, Transaction[]> = {};

    filteredTransactions.forEach(transaction => {
      const day = new Date(transaction.createdAt).getDate();
      const formattedDate = formatDateByDayName(transaction.createdAt);
      
      let amount = parseFloat(transaction.price);

      if (transaction.transactionType === "expense") {
        amount *= -1;
      }
      console.log(amount);

      // 집계된 소비 데이터
      expensesData[day] = (expensesData[day] || 0) + amount;

      // 그룹화
      if (!groupedData[formattedDate]) groupedData[formattedDate] = [];
      groupedData[formattedDate].push(transaction);
    });

    setExpenses(expensesData);
    setGroupedByDate(groupedData);
  }, [transactions, month]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="text-white p-8 relative h-screen overflow-hidden">
      <div className="overflow-y-auto scrollbar-hide max-h-[calc(100vh-100px)]">
        <BottomNav />
        <MonthlyInfo />

        <Link href="/my-spend/categories">
          <TopSpendingCategory />
        </Link>

        <div className="mt-8 flex flex-col items-center justify-center">
          <Calendar expenses={expenses} />
        </div>

        {Object.entries(groupedByDate).map(([date, dailyTransactions]) => (
          <div key={date} className="mt-8">
            <div className="text-sm font-semibold mb-6 text-contrast-200">{date}</div>
            {dailyTransactions.map((transaction) => (
              <div key={transaction.transactionId} className="mb-6">
                <div className="font-bold text-lg">
                  {formatTransactionPrice(transaction.price, transaction.transactionType)}
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

"use client";

import TopSpendingCategory from "./components/TopSpendingCategory";
import Link from "next/link";
import { useTransactionStore } from "@/store/transactionStore";
import { useMonthlyStore } from "@/store/monthlyStore";
import { useEffect, useState } from "react";
import { getMonthlySpend, getMonthlyTransactions, getMthlySpendOfCtg } from "@/api/transaction";
import { useAuthStore } from "@/store/authStore";
import { Loading } from "@/components/Loading";
import { useCategoryStore } from "@/store/categoryStore";
import { MonthlyInfo } from "./components/MonthlyInfo";
import BottomNav from "@/components/BottomNav";
import { Transaction } from "@/types/transaction";
import { formatDateByDayName } from "@/utils/formatDate";
import { formatTransactionPrice } from "@/utils/formatPrice";
import Calendar from "./components/Calender";
import { CategoryIconsMini } from "@/icons/mapping";

const MySpendPage = () => {
  const { user } = useAuthStore();
  const { transactions, setTransactions, setSelectedTransaction } = useTransactionStore();
  const { currentYear, currentMonth, setMonthlySpend } = useMonthlyStore();
  const { setCategories } = useCategoryStore();
  const [loading, setLoading] = useState(true);
  const [expenses, setExpenses] = useState<Record<number, number>>({});
  const [incomes, setIncomes] = useState<Record<number, number>>({});
  const [groupedByDate, setGroupedByDate] = useState<Record<string, Transaction[]>>({});

  useEffect(() => {
    const fetchMonthlyTransactions = async () => {
      try {
        setLoading(true);
        const [monthlySpendData, transacData, ctgData] = await Promise.allSettled([
          getMonthlySpend(user.token, currentYear, currentMonth),
          getMonthlyTransactions(user.token, currentYear, currentMonth),
          getMthlySpendOfCtg(user.token, currentYear, currentMonth),
        ]);

        if (monthlySpendData.status === "fulfilled") setMonthlySpend(currentYear, currentMonth, monthlySpendData.value);
        if (transacData.status === "fulfilled") setTransactions(transacData.value);
        if (ctgData.status === "fulfilled") setCategories(ctgData.value);

      } catch (error) {
        console.log("데이터 페칭 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMonthlyTransactions();
  }, [user.token, currentYear, currentMonth, setTransactions, setCategories, setMonthlySpend]);

  useEffect(() => {
    // 일별 소비 데이터 집계
    const expensesData: Record<number, number> = {};
    const incomesData: Record<number, number> = {};
    const groupedData: Record<string, Transaction[]> = {};

    transactions.forEach(transaction => {
      const day = new Date(transaction.createdAt).getDate();
      const formattedDate = formatDateByDayName(transaction.createdAt);
      
      let amount = transaction.price;
      if (transaction.transactionType === "expense") {
        amount *= -1;
        expensesData[day] = (expensesData[day] || 0) + amount;
      } else {
        incomesData[day] = (incomesData[day] || 0) + amount;
      }

      // 그룹화
      if (!groupedData[formattedDate]) groupedData[formattedDate] = [];
      groupedData[formattedDate].push(transaction);
    });

    setExpenses(expensesData);
    setIncomes(incomesData);
    setGroupedByDate(groupedData);
  }, [transactions]);

  if (loading) {
    return <Loading message={`${user.name}님의 소비 내역을 불러오는 중이에요`} size="text-lg" />;
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
          <Calendar expenses={expenses} incomes={incomes} />
        </div>

        {Object.entries(groupedByDate).map(([date, dailyTransactions]) => (
          <div key={date} className="mt-10">
            <div className="text-xs mb-6 text-white">{date}</div>
            {dailyTransactions.map((transaction, index) => (
              <div key={index} className="mb-8 cursor-pointer">
                <Link 
                  href={`/my-spend/transactions/${index + 1}`}
                  onClick={() => setSelectedTransaction(transaction)}
                >
                  <div className="flex items-center">
                    <div>
                      {CategoryIconsMini[transaction.categoryName as keyof typeof CategoryIconsMini] || null}
                    </div>
                    <div className="ml-3">
                      <div className="font-bold text-lg">
                        {formatTransactionPrice(transaction.price, transaction.transactionType)}원
                      </div>
                      <div className="text-xs text-contrast-200">
                        {transaction.recipient} | {transaction.userCardId ? transaction.cardName : transaction.accName}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MySpendPage;

"use client"

import { useEffect, useState } from "react";
import AfterLinkPage from "./components/AfterLink";
import BeforeLinkPage from "./components/BeforeLink";
import { getLinkedAccounts } from "@/api/account";
import { Account } from "../../types/account";
import { getMonthlySpend } from "@/api/transaction";
import { Loading } from "../../components/Loading";
import { useAuthStore } from "@/store/authStore";

const HomePage: React.FC = () => {
  const { user } = useAuthStore();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [monthlySpend, setMonthlySpend] = useState<string>("0");
  const [loading, setLoading] = useState<boolean>(true);

  // 현재 연도와 월 계산
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        // 두 개의 API 병렬로 호출
        console.log(user.token);
        const [accountData, monthlySpendData] = await Promise.allSettled([
          getLinkedAccounts(user.token),
          getMonthlySpend(user.token, year, month),
        ]);

        if (accountData.status === "fulfilled") {
          setAccounts(accountData.value);
        } else {
          console.error("계좌 정보 불러오기 실패:", accountData.reason);
        }
  
        if (monthlySpendData.status === "fulfilled") {
          setMonthlySpend(monthlySpendData.value);
        } else {
          console.error("월별 소비 불러오기 실패:", monthlySpendData.reason);
          setMonthlySpend("데이터 없음"); // 기본 값 설정
        }
      } catch (error) {
        console.error("Failed to fetch accout list:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAccounts();
  }, [month, year]);

  if (loading) {
    return <Loading />
  }

  return (
    <div>
      {accounts.length ? (
        <AfterLinkPage accounts={accounts} month={month} monthlySpend={monthlySpend}/>
      ) : (
        <BeforeLinkPage />
      )}
    </div>
  )
}

export default HomePage;

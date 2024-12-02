"use client"

import { useEffect, useState } from "react";
import AfterLinkPage from "./components/AfterLink";
import BeforeLinkPage from "./components/BeforeLink";
import { getLinkedAccounts } from "@/api/account";
import { getMonthlySpend } from "@/api/transaction";
import { Loading } from "../../components/Loading";
import { useAuthStore } from "@/store/authStore";
import { useAccountStore } from "@/store/accountStore";
import BottomNav from "@/components/BottomNav";
import { LogoToAccounts } from "@/components/Logo";
import { useMonthlyStore } from "@/store/monthlyStore";

const HomePage: React.FC = () => {
  const { user } = useAuthStore();
  const { accounts, setAccounts } = useAccountStore();
  const { year, month, monthlySpend, setMonthlySpend, updateDate } = useMonthlyStore();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    updateDate();

    const fetchAccounts = async () => {
      try {
        // 두 개의 API 병렬로 호출
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
  }, [month, year, setAccounts, setMonthlySpend, user.token, updateDate]);

  if (loading) {
    return <Loading />
  }

  return (
    <div className="px-8 pt-4 relative h-screen overflow-hidden text-white">
      <LogoToAccounts />
      <div className="mt-5">
        {accounts.length ? (
          <AfterLinkPage accounts={accounts} />
        ) : (
          <BeforeLinkPage />
        )}
      </div>
      <BottomNav />
    </div>
  )
}

export default HomePage;

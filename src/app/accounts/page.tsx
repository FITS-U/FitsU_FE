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
import { Advertisement } from "./components/Advertisement";

const HomePage: React.FC = () => {
  const { user } = useAuthStore();
  const { accounts, setAccounts } = useAccountStore();
  const { currentYear, currentMonth, setMonthlySpend, resetToCurrentDate } = useMonthlyStore();
  const [loading, setLoading] = useState<boolean>(true);

  // useEffect(() => {
  //   resetToCurrentDate();

  //   const fetchAccounts = async () => {
  //     try {
  //       // 두 개의 API 병렬로 호출
  //       const [accountData, monthlySpendData] = await Promise.allSettled([
  //         getLinkedAccounts(user.token),
  //         getMonthlySpend(user.token, currentYear, currentMonth),
  //       ]);

  //       if (accountData.status === "fulfilled") setAccounts(accountData.value);
  //       if (monthlySpendData.status === "fulfilled") setMonthlySpend(currentYear, currentMonth, monthlySpendData.value);

  //     } catch (error) {
  //       console.error("Failed to fetch accout list:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchAccounts();
  // }, [currentMonth, currentYear, setAccounts, setMonthlySpend, user.token, resetToCurrentDate]);

  // if (loading) {
  //   return <Loading />
  // }

  return (
    <div className="p-8 relative h-screen overflow-hidden text-white">
      <LogoToAccounts />
      <Advertisement />
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

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
import { IoSettingsSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";

const HomePage: React.FC = () => {
  const { user, hydrateUser } = useAuthStore();
  const { accounts, setAccounts } = useAccountStore();
  const { currentYear, currentMonth, setMonthlySpend, resetToCurrentDate } = useMonthlyStore();
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    hydrateUser();
    resetToCurrentDate();

    const fetchAccounts = async () => {
      try {
        if (user.token) {
          const [accountData, monthlySpendData] = await Promise.allSettled([
          getLinkedAccounts(user.token),
          getMonthlySpend(user.token, currentYear, currentMonth),
        ]);

        if (accountData.status === "fulfilled") setAccounts(accountData.value);
        if (monthlySpendData.status === "fulfilled") setMonthlySpend(currentYear, currentMonth, monthlySpendData.value);
        }
      } catch (error) {
        console.error("Failed to fetch accout list:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAccounts();
  }, [currentMonth, currentYear, setAccounts, setMonthlySpend, user.token, resetToCurrentDate, hydrateUser]);

  if (loading) {
    return <Loading />
  }

  return (
    <div className="p-8 relative h-screen overflow-hidden text-white">
      <div className="flex items-center justify-between">
        <LogoToAccounts />
        <IoSettingsSharp 
          className="w-6 h-auto text-contrast-300"
          onClick={() => router.push("/setting")}
        />
      </div>
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

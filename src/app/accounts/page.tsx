"use client"

import { useEffect, useState } from "react";
import AfterLinkPage from "./components/AfterLink";
import BeforeLinkPage from "./components/BeforeLink";
import { getLinkedAccounts } from "@/api/AccountApi";
import { UUID } from "crypto";
import { Account } from "../../types/account";
import { getMonthlySpend } from "@/api/TransactionApi";
import { Loading } from "../../components/Loading";

const HomePage: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [monthlySpend, setMonthlySpend] = useState<string>("0");
  const [loading, setLoading] = useState<boolean>(true);

  const userId: UUID = "d68ce080-a817-11ef-b6a4-c43d1a367887";
  // 현재 연도와 월 계산
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        // 두 개의 API 병렬로 호출
        const [accountData, monthlySpendData] = await Promise.all([
          getLinkedAccounts(userId),
          getMonthlySpend(userId, year, month),
        ]);

        setAccounts(accountData);
        setMonthlySpend(monthlySpendData);

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

"use client"

import { FaChevronLeft } from "react-icons/fa";
import { AccountInfo } from "./components/AccountInfo";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getTransactionByAccountId } from "@/api/transaction";
import { useAuthStore } from "@/store/authStore";
import { useAccountStore } from "@/store/accountStore";
import { Transaction } from "@/types/account";
import { Loading } from "@/components/Loading";
import { Transactions } from "./components/Transactions";

const AccountTransactions = () => {
  const { user } = useAuthStore();
  const { selectedAccount } = useAccountStore();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAccTransactions = async () => {
      try {
        const data = await getTransactionByAccountId(user.token, selectedAccount.accountId);
        setTransactions(data.content);
      } catch (error) {
        console.error("Failed to fetch transaction list of account:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchAccTransactions();
  }, [user.token, selectedAccount.accountId]);

  if (loading) {
    return <Loading />
  }

  return (
    <div className="p-8 text-white">
      <div className="flex items-center justify-between">
        <Link href={`/accounts`}>
          <FaChevronLeft className="h-5"/>
        </Link>
        <span className="tracking-tighter">{selectedAccount.accName}</span>
        <div></div>
      </div>
      <AccountInfo />
      <div className="mt-8 -mx-8 h-4 flex bg-box-color"></div>
      {transactions.length 
        ? <Transactions transactions={transactions}/>
        : <div className="flex items-center justify-center mt-32">거래 내역이 존재하지 않습니다.</div>
      }
    </div>
  );
};

export default AccountTransactions;
"use client";

import { getUnlinkedAccounts, updateLinkStatus } from "@/api/account";
import { Account } from "@/types/account";
import { useBankStore } from "@/store/bankStore";
import { UUID } from "crypto";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { Loading } from "@/components/Loading";
import { useAuthStore } from "@/store/authStore";

const LinkPage: React.FC = () => {
  const { selectedBankIds } = useBankStore();
  const { user } = useAuthStore();

  const [unlinkAccounts, setUnlinkAccounts] = useState<Account[]>([]);
  const [updatedAccounts, setUpdatedAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // const userId: UUID = "62c92f85-a7d0-11ef-b6a4-c43d1a367887";

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const unlinkAccData = await getUnlinkedAccounts(user.token, selectedBankIds);
        setUnlinkAccounts(unlinkAccData);
      } catch (error) {
        console.error("Failed to fetch unliked accounts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAccounts();
  }, [selectedBankIds]);

  const updateAccounts = async () => {
    try {
      const updatedAccData = await updateLinkStatus(user.token, selectedBankIds);
      setUpdatedAccounts(updatedAccData);
    } catch (error) {
      console.error("Failed to fetch update accounts:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div className="p-8 text-white pb-20 relative h-screen overflow-hidden">
      <Link href="/banks">
        <FaChevronLeft className="h-5" />
      </Link>
      <div className="mt-12 font-bold text-xl">아래 계좌를 연결할게요</div>
        <div className="mt-32">
          {unlinkAccounts.length ? (
            unlinkAccounts.map((account) => (
              <div key={account.accountId} className="mb-6">
                <div className="text-base/[15px] font-semibold tracking-tight">{account.accName}</div>
                <div className="mt-1.5 text-sm font-light">
                  <span className="tracking-tight">{account.bankName} </span>
                  <span>{account.accountNum}</span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">계좌 정보가 없습니다.</p>
          )}
        </div>
        <Link href="/accounts" className="absolute block bottom-4 w-full -left-0">
          <div className="px-6"> 
            <button
              onClick={updateAccounts}
              className="p-4 w-full x-2 text-black font-bold bg-main-color rounded-lg"
            >
              다음
            </button>
          </div>
        </Link>
    </div>
  );
};

export default LinkPage;
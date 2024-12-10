"use client";

import { getUnlinkedAccounts, updateLinkStatus } from "@/api/account";
import { useBankStore } from "@/store/bankStore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { Loading } from "@/components/Loading";
import { useAuthStore } from "@/store/authStore";
import { useAccountStore } from "@/store/accountStore";

const LinkPage: React.FC = () => {
  const { selectedBankIds } = useBankStore();
  const { user } = useAuthStore();
  const { accounts, setAccounts, updateAccount } = useAccountStore();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAccounts = async () => {
      // 페이지 로드 시점에서 바로 API 호출 시작
      setTimeout(async () => {
        try {
          const unlinkAccData = await getUnlinkedAccounts(user.token, selectedBankIds);
          setAccounts(unlinkAccData);
        } catch (error) {
          console.error("Failed to fetch unlinked accounts:", error);
        } finally {
          setLoading(false); // 3초 후 로딩 완료
        }
      }, 3000); // 3초 후에 로딩 완료
    };
    fetchAccounts();
  }, [selectedBankIds]);

  const updateAccounts = async () => {
    try {
      const updatedAccData = await updateLinkStatus(user.token, selectedBankIds);
      updateAccount(updatedAccData);
    } catch (error) {
      console.error("Failed to fetch update accounts:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="h-screen p-8 text-white">
        <Link href="/banks">
          <FaChevronLeft className="h-5" />
        </Link>
        <div className="mt-12 font-bold text-xl">이세연님의 계좌를 찾고 있어요</div>
        <div className="mt-32 flex items-center justify-center">
          <div className="w-16 h-16 border-8 border-contrast-800 border-t-6 border-t-orange-500 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 text-white pb-20 relative h-screen overflow-hidden">
      <Link href="/banks">
        <FaChevronLeft className="h-5" />
      </Link>
      <div className="mt-12 font-bold text-xl">아래 계좌를 연결할게요</div>
      <div className="mt-32">
        {accounts.length ? (
          accounts.map((account) => (
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
            className="p-4 w-full x-2 text-black font-bold bg-orange-500 rounded-lg"
          >
            다음
          </button>
        </div>
      </Link>
    </div>
  );
};

export default LinkPage;

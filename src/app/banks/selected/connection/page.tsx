"use client";

import { updateLinkStatus } from "@/api/account";
import { useAccountStore } from "@/store/accountStore";
import { useAuthStore } from "@/store/authStore";
import { useBankStore } from "@/store/bankStore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const ConnectionPage = () => {
  const { selectedBankIds } = useBankStore();
  const { user, hydrateUser } = useAuthStore();
  const { accounts, updateAccount } = useAccountStore();
  const [loading, setLoading] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    hydrateUser();

    const updateAccounts = async () => {
      try {
        const updatedAccData = await updateLinkStatus(user.token, selectedBankIds);

        // 로딩 진행률 업데이트
        const interval = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 100) {
              clearInterval(interval);
              return 100; // 100%에 도달하면 종료
            }
            return prev + 1; // 1씩 증가
          });
        }, 50); // 50ms마다 1씩 증가

        updateAccount(updatedAccData);
      } catch (error) {
        console.error("Failed to fetch update accounts:", error);
      } finally {
        setLoading(false);
      }
    };

    updateAccounts();
  }, [user.token, selectedBankIds]);

  if (loading) {
    return (
      <div className="h-screen p-8 text-white">
        <Link href="/banks">
          <FaChevronLeft className="h-5" />
        </Link>
        <div className="mt-12 font-bold text-xl">{progress}%</div>
        <div className="mt-12 mx-[-32px] bg-contrast-700 h-[2px]"></div>
        <div className="mt-8">
          {accounts.map((account) => (
            <div key={account.accountId} className="mb-6">
              <div className="text-base/[15px] font-semibold tracking-tight">{account.accName}</div>
              <div className="mt-1.5 text-sm font-light">{account.accName}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 text-white">
      <Link href="/accounts">
        <IoClose className="text-2xl" />
      </Link>
      <div className="mt-12 font-bold text-xl space-y-2">
        <p>{user.name}님의</p>
        <p>계좌 연결이 끝났어요!</p>
      </div>
      <div className="mt-12 mx-[-32px] bg-contrast-700 h-[2px]"></div>
      <div className="mt-8">
        <div className="font-semibold">연결 성공</div>
        <div className="mt-10 text-contrast-200 font-semibold">은행</div>
        <div className="mt-6">
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
      </div>
    </div>
  );
};

export default ConnectionPage;

/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useBankStore } from "@/store/bankStore";
import { useAuthStore } from "@/store/authStore";
import { useAccountStore } from "@/store/accountStore";
import { updateLinkStatus } from "@/api/account";

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
        // 진행률 업데이트
        const interval = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 90) {
              clearInterval(interval); // 90%에서 멈춤
              return prev;
            }
            return prev + 1; // 1씩 증가
          });
        }, 50); // 50ms마다 1씩 증가

        const updatedAccData = await updateLinkStatus(user.token, selectedBankIds);
        updateAccount(updatedAccData);

        // API 완료 후 진행률을 100%로 설정
        setTimeout(() => {
          setProgress(100);
          clearInterval(interval);
          setLoading(false); // 로딩 종료
        }, 500);
      } catch (error) {
        console.error("Failed to fetch update accounts:", error);
      }
    };

    updateAccounts();
  }, [user.token, selectedBankIds, hydrateUser, updateAccount]);

  if (loading) {
    return (
      <div className="h-screen p-8 text-white">
        <Link href="/banks">
          <FaChevronLeft className="h-5" />
        </Link>
        <div className="mt-12 font-bold text-xl">{progress}%</div>
        <div className="mt-12 mx-[-32px] bg-contrast-700 h-[2px]">
          <div
            className="bg-orange-500 h-[2px] transition-all duration-100"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="mt-8">
          {accounts.map((account) => (
            <div key={account.accountId} className="mb-6 flex items-center">
              <div className="w-12 h-auto">
                <img
                  src={account.imageUrl}
                  alt={account.bankName}
                  className="rounded-lg"
                />
              </div>
              <div className="ml-2">
                <div className="text-base font-semibold tracking-tight">{account.accName}</div>
                <div className="text-sm font-light">{account.accName}</div>
              </div>
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
        <div className="mt-8">
          {accounts.length ? (
            accounts.map((account) => (
              <div key={account.accountId} className="mb-6 flex items-center">
                <div className="w-12 h-auto">
                  <img
                    src={account.imageUrl}
                    alt={account.bankName}
                    className="rounded-lg"
                  />
                </div>
                <div className="ml-2">
                  <div className="text-base font-semibold tracking-tight">{account.accName}</div>
                  <div className="text-sm font-light">
                    <span className="tracking-tight">{account.bankName} </span>
                    <span>{account.accountNum}</span>
                  </div>
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

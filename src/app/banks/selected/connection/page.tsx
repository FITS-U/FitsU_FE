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
  const { user } = useAuthStore();
  const { accounts, updateAccount } = useAccountStore();
  const [loading, setLoading] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
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
        <div className="mt-32 flex items-center justify-center">
          <div className="relative w-16 h-16">
            <div
              className="absolute inset-0 rounded-full border-8 border-contrast-800"
              style={{
                clipPath: `inset(0 ${100 - progress}% 0 0)`, // 진행률에 따라 클리핑
              }}
            />
            <div className="w-full h-full border-8 border-t-6 border-t-orange-500 rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 text-white">
      <div className="flex items-center justify-between">
        <Link href="/banks">
          <FaChevronLeft className="h-5" />
        </Link>
        <Link href="/accounts">
          <IoClose />
        </Link>
      </div>
      <div>
        <p>이세연님의</p>
        <p>계좌 연결이 끝났어요!</p>
      </div>
      <div>
        <div>연결 성공</div>
      </div>
    </div>
  );
};

export default ConnectionPage;

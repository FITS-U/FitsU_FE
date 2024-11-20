"use client";

import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";

const LinkPage: React.FC = () => {
  // 임의의 계좌 데이터
  const accounts = [
    { accountId: 1, accountNum: "1234567891111", accName: "나라사랑우대통장", userId: "user1", bankId: 1, bankName: "국민은행" },
    { accountId: 2, accountNum: "9876543212222", accName: "쏠편한입출금통장", userId: "user2", bankId: 2, bankName: "신한은행" },
  ];

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
            <button className="p-4 w-full x-2 text-black font-bold bg-main-color rounded-lg">
              다음
            </button>
          </div>
        </Link>
    </div>
  );
};

export default LinkPage;
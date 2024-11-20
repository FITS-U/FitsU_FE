"use client"

import Link from "next/link";
import { useState } from "react";
import { FaCheckCircle, FaRegCheckCircle, FaChevronLeft } from "react-icons/fa";

interface Bank {
  bankId: number;
  bankName: string;
}

const AccountPage: React.FC = () => {
  const [isChecked, setIsChecked] = useState<{ [key: number]: boolean }>({});
  const [selectedBankIds, setSelectedBankIds] = useState<number[]>([]);

  // 임의의 은행 데이터
  const banks: Bank[] = [
    { bankId: 1, bankName: "KB국민은행" },
    { bankId: 2, bankName: "신한은행" },
    { bankId: 3, bankName: "우리은행" },
    { bankId: 4, bankName: "하나은행" },
    { bankId: 5, bankName: "NH농협은행" },
    { bankId: 6, bankName: "기업은행" },
    { bankId: 7, bankName: "SC제일은행" },
    { bankId: 8, bankName: "KDB산업은행" },
    { bankId: 9, bankName: "카카오뱅크" },
    { bankId: 10, bankName: "토스뱅크" },
    { bankId: 11, bankName: "신협" },
    { bankId: 12, bankName: "상호저축은행" },
    { bankId: 13, bankName: "우체국은행" },
    { bankId: 14, bankName: "광주은행" },
    { bankId: 15, bankName: "전북은행" },
    { bankId: 16, bankName: "제주은행" },
    { bankId: 17, bankName: "대구은행" },
    { bankId: 18, bankName: "부산은행" },
    { bankId: 19, bankName: "경남은행" },
  ];

  const handleClick = (bankId: number) => {
    setSelectedBankIds((prevState) =>
      prevState.includes(bankId)
        ? prevState.filter((id) => id !== bankId)
        : [...prevState, bankId]
    );

    setIsChecked((prevState) => ({
      ...prevState,
      [bankId]: !prevState[bankId],
    }));
  };

  // 선택 해제
  const deselectAll = () => {
    setSelectedBankIds([]);
    setIsChecked({});
  };

  // 모든 은행 선택
  const selectAll = () => {
    const allBankIds = banks.map((bank) => bank.bankId);
    const allChecked = banks.reduce((acc, bank) => {
      acc[bank.bankId] = true;
      return acc;
    }, {} as { [key: number]: boolean });

    setSelectedBankIds(allBankIds);
    setIsChecked(allChecked);
  };

  return (
    <div className="p-8 pb-20 text-white relative h-screen overflow-hidden">
      <Link href="/accounts">
        <FaChevronLeft className="h-5" />
      </Link>
      <div className="font-bold text-xl mt-6">어떤 자산을 연결할까요?</div>
      <div className="mt-20 flex items-center justify-between">
        <span className="text-xl font-semibold">은행</span>
        {selectedBankIds.length ? 
          <span
            onClick={deselectAll}
            className="text-sm font-light cursor-pointer tracking-tighter"
          >
            선택 해제
          </span>
        :
          <span
            onClick={selectAll}
            className="text-sm font-light cursor-pointer tracking-tighter"
          >
            모두 선택
          </span>
        }
      </div>
      <div className="overflow-y-auto scrollbar-hide max-h-[calc(100vh-270px)]">
        <div className="mb-10">
          {banks.map((bank) => (
            <div
              key={bank.bankId}
              className="mt-8 flex items-center justify-between cursor-pointer"
              onClick={() => handleClick(bank.bankId)}
            >
              <span className="text-lg">{bank.bankName}</span>
              <span>
                {isChecked[bank.bankId] ? 
                  <FaCheckCircle className="w-7 h-7 text-main-color" />
                : 
                  <FaRegCheckCircle className="w-7 h-7" />
                }
              </span>
            </div>
          ))}
        </div>
      </div>
      {selectedBankIds.length ? (
        <Link href="/accounts/link" className="absolute block bottom-4 w-full -left-0">
          <div className="px-6">
            <button className="p-4 w-full x-2 font-bold text-black bg-main-color rounded-2xl">
              {selectedBankIds.length}개 연결하기
            </button>
          </div>
        </Link>
      ) : (
        <div className="absolute block bottom-4 w-full -left-0">
          <div className="px-6">
            <button
              className="p-4 w-full x-2 font-bold bg-gray-500 rounded-2xl"
              disabled
            >
              은행을 선택해주세요
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountPage;

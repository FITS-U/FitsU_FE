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
    <div className="m-8 text-white">
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
      {selectedBankIds.length ? (
        <Link href="/accounts/link">
          <button className="w-full h-14 font-bold text-black bg-main-color rounded-2xl">
            {selectedBankIds.length}개 연결하기
          </button>
        </Link>
      ) : (
        <button
          className="w-full h-14 font-bold bg-gray-500 rounded-2xl"
          disabled
        >
          은행을 선택해주세요
        </button>
      )}
    </div>
  );
};

export default AccountPage;

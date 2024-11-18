"use client"
import { FaRegCheckCircle, FaCheckCircle } from "react-icons/fa";
import { getBankList } from "@/api/AccountApi"
import React, { useEffect, useState } from "react";
import Link from "next/link";

interface BankData {
  bankId: number;
  bankName: string;
}

interface SetUpAccountPageProps {
  userId: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d';
  accountId: 4;
}

const SetUpAccountPage : React.FC<SetUpAccountPageProps> = ({ userId, accountId }) => {

  const [banks, setBanks] = useState<BankData[]>([]);
  const [isChecked, setIsChecked] = useState<{[key:number]: boolean}>({});
  const [selectedBankIds, setSelectedBankIds] = useState<number[]>([]);


  const handleClick = (bankId: number) => {
    setSelectedBankIds(prevState => prevState.includes(bankId)? prevState.filter(id => id !== bankId)
  : [...prevState, bankId]);

    setIsChecked(prevState =>({...prevState, 
      [bankId]: !prevState[bankId],
    }));
  };

  useEffect(() => {
    const loadBanks = async () => {
      const bankData = await getBankList();
      setBanks(bankData);
    }; loadBanks();
  }, [])

  return (
    <div>
      <Link href="/">
      <button className="text-white p-5">◁</button>
      </Link>
      <div className="m-6">
        <p className="text-white font-bold mb-10">어떤 자산을 연결할까요?</p>
      </div> 
      <div className="m-6">
        <h3 className="text-white">은행</h3>
      </div>
      <div className="m-4">
        {banks && banks.length > 0 ? (
          banks.map((bank) => (
            <button key={bank.bankId} onClick={() =>handleClick(bank.bankId)} className="w-[330px] text-white m-3 flex justify-between items-center">
           {bank.bankName}
           {isChecked[bank.bankId] ? <FaCheckCircle /> : <FaRegCheckCircle />}
          </button>
          ))
        )  : (<div className="text-white">은행 정보가 없습니다.</div>
        )}
      </div>
      {setSelectedBankIds.length > 0 ? (
      <Link href={`/account/link?${selectedBankIds.map(id => `bankId=${id}`).join('&')}&userId=${userId}&accountId=${accountId}`}>
      <button className="text-black bg-[#FFC03D] w-[360px] h-[60px] m-4">연결하기</button>
      </Link>
      ) : (
        <button className="w-[360px] h-[60px] text-white bg-gray-500 m-4" disabled>
            은행을 선택해주세요
          </button>
      )}
    </div> 
  );
};

export default SetUpAccountPage;
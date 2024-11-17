"use client"
import { FaRegCheckCircle } from "react-icons/fa";
import { getBankList } from "@/api/AccountApi"
import React, { useEffect, useState } from "react";
import Link from "next/link";

interface BankData {
  bankId: number;
  bankName: string;
}

const SetUpAccountPage : React.FC<BankData> = () => {

  const [banks, setBanks] = useState<BankData[]>([]);

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
            <button key={bank.bankId} className="w-auto text-white m-3">
           {bank.bankName}<FaRegCheckCircle/>
          </button>
          ))
        ) : (<div className="text-white">은행 정보가 없습니다.</div> 
        )}
      </div>
      <Link href="/account/link">
      <button className="text-black bg-[#FFC03D] w-[360px] h-[60px] m-4">연결하기</button>
      </Link>
    </div> 
  );
};

export default SetUpAccountPage;
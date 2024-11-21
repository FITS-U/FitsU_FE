"use client"

import { getBankList } from "@/api/AccountApi";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaCheckCircle, FaRegCheckCircle, FaChevronLeft } from "react-icons/fa";
import { Bank } from "../types/account";
import { useBankStore } from "@/store/useBankStore";

const AccountPage: React.FC = () => {
  const [banks, setBanks] = useState<Bank[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // zustand - bankStore
  const { selectedBankIds, toggleBankId, selectAllBanks, deselectAllBanks } = useBankStore();

  // 은행 리스트 api 연동
  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const data = await getBankList();
        setBanks(data);
      } catch (error) {
        console.error("Failed to fetch bank list:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanks();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        <p>Loading...</p>
      </div>
    );
  }

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
            onClick={deselectAllBanks}
            className="text-sm font-light cursor-pointer tracking-tighter"
          >
            선택 해제
          </span>
        :
          <span
            onClick={() => selectAllBanks(banks.map(bank => bank.bankId))}
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
              onClick={() => toggleBankId(bank.bankId)}
            >
              <span className="text-lg">{bank.bankName}</span>
              <span>
                {selectedBankIds.includes(bank.bankId) ? 
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
        <Link 
          href="/banks/selected"
          className="absolute block bottom-4 w-full -left-0"
        >
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

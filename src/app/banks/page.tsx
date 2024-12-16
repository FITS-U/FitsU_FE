/* eslint-disable @next/next/no-img-element */
"use client"

import { getBankList } from "@/api/account";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaCheckCircle, FaRegCheckCircle, FaChevronLeft } from "react-icons/fa";
import { useBankStore } from "@/store/bankStore";
import { Loading } from "../../components/Loading";

const AccountPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const { banks, setBanks, selectedBankIds, toggleBankId, selectAllBanks, deselectAllBanks } = useBankStore();

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
  }, [setBanks]);

  if (loading) {
    return <Loading />
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
              <div className="flex items-start justify-start space-x-6">
                <div className="w-6 h-auto">
                  <img src={bank.imageUrl} alt={bank.bankName} className="w-full h-auto rounded-lg" />
                </div>
                <span className="text-lg">{bank.bankName}</span>
              </div>
              <span>
                {selectedBankIds.includes(bank.bankId) ? 
                  <FaCheckCircle className="w-7 h-7 text-orange-500" />
                : 
                  <FaRegCheckCircle className="w-7 h-7 text-contrast-400" />
                }
              </span>
            </div>
          ))}
        </div>
      </div>
      {selectedBankIds.length ? (
        <Link 
          href="/banks/privacy-consent"
          className="absolute block bottom-4 w-full -left-0"
        >
          <div className="px-6">
            <button className="p-4 w-full x-2 font-bold text-black bg-orange-500 rounded-2xl">
              {selectedBankIds.length}개 연결하기
            </button>
          </div>
        </Link>
      ) : (
        <div className="absolute block bottom-4 w-full -left-0">
          <div className="px-6">
            <button
              className="p-4 w-full x-2 font-bold bg-contrast-600 rounded-2xl"
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

"use client"
import { getAccountInfo } from "@/api/AccountApi";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { UUID } from "crypto";
interface AccountData {
  accountId: number;
  accountNum: string
  accName: string;
  userId: UUID;
  bankId: number;
}

const LinkAccountPage: React.FC<AccountData>= ({ userId, accountId}) =>{

  const [accounts, setAccounts] = useState<AccountData[]>([]);

  useEffect(() => {
    const loadAccounts = async() => {
      const accountData = await getAccountInfo(userId, accountId);
      console.log(accountData);
      setAccounts(accountData);
    };
    loadAccounts();
  }, []);

  return (
    <div>
    <div className="m-10">
        <h1 className="text-white">아래 계좌를 연결할게요</h1>
    </div>
    <div>
      {accounts.length > 0 ? (
          accounts.map((account) => (
            <div key={account.accountId}>
              <p>{account.accName} {account.accountNum}</p>
            </div>
          ))
        ) : (
          <p className="text-white text-center">계좌 정보가 없습니다.</p>
        )}
      </div>
      <div className="m-4">
      <Link href= "/">
      <button className="text-white font-bold bg-[#1C1B18] min-w-[360px] min-h-[76px] rounded-lg">다음</button>
      </Link>
      </div>
    </div>
  );
}

export default LinkAccountPage;


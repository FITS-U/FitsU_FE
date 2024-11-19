"use client"

import Link from "next/link";
import { useEffect, useState } from "react";
import MyAccountPage from "./MyAccountPage";
import { getAccountInfo, getLinkedStatus } from "@/api/AccountApi";
import { UUID } from "crypto";


interface AccountData {
  accountId: number;
  userId: UUID;
  balance: number;
  accName: string;
}

interface Data {
  userId: UUID;
}

const AccountLinkPage: React.FC<Data> = ({ userId }) => {
  const [isLinked, setIsLinked] = useState(false);
  const [accounts, setAccounts] = useState<AccountData[]>([]);
  const [accountId, setAccountId] = useState<number | null>(null);

  useEffect(() => {
    const loadStatus = async() => {
      if (accountId !== null) {
        const data = await getLinkedStatus(accountId, userId);
        setIsLinked(data.linked);

      if(data.linked) {
        const accountData = await getAccountInfo(userId ,data.accountId);
        setAccounts(accountData);
    }
  }
      };
    loadStatus();
  }, []);

  return (
  <div>
    {!isLinked ?(
    <div className="m-4">
      <Link href="/account">
        <button className="text-white font-bold bg-[#1C1B18] min-w-[360px] min-h-[76px] rounded-lg">내 계좌 연결하기
        </button>
      </Link>
    </div>) :(<MyAccountPage accounts={accounts}/>)}
  </div>
  )
}

export default AccountLinkPage;
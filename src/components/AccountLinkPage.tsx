"use client"

import Link from "next/link";
import { useEffect, useState } from "react";
import MyAccountPage from "./MyAccountPage";
import { getLinkedStatus } from "@/api/AccountApi";

interface Data {
  accountId: number;
  userId: string;
}

const AccountLinkPage: React.FC<Data> = ({ accountId, userId }) => {
  const [isLinked, setIsLinked] = useState(false);

  useEffect(() => {
    const loadStatus = async() => {
      const Data = await getLinkedStatus(accountId, userId);
      setIsLinked(Data.linked);
    };
    loadStatus();
  }, []);

  return (
  <div>
    { isLinked ?(
    <div className="m-4">
      <Link href="/account">
        <button className="text-white font-bold bg-[#1C1B18] min-w-[360px] min-h-[76px] rounded-lg">내 계좌 연결하기
        </button>
      </Link>
    </div>) :(<MyAccountPage/>)}
  </div>
  )
}

export default AccountLinkPage;
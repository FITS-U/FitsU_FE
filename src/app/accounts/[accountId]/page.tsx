"use client"

import { FaChevronLeft } from "react-icons/fa";
import { AccountInfo } from "./components/AccountInfo";
import { Transactions } from "./components/Transactions";
import Link from "next/link";

const AccountTransactions = () => {
  return (
    <div className="p-8 text-white">
      <div className="flex items-center justify-between">
        <Link href={`/accounts`}>
          <FaChevronLeft className="h-5"/>
        </Link>
        <span className="tracking-tighter">주거래 하나 통장</span>
        <div></div>
      </div>
      <AccountInfo />
      <div className="mt-8 -mx-8 h-4 flex bg-box-color"></div>
      <Transactions />
    </div>
  );
};

export default AccountTransactions;
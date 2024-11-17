"use client"
import { getAccountList } from "@/api/AccountApi";
import React, { useEffect, useState } from "react";

interface AccountData {
  accountId: number;
  accountNum: string
  accName: string;
  userId: string;
  bankId: number;
}

const LinkAccountPage: React.FC<AccountData>= ({ userId, accountId}) =>{

  const [accounts, setAccounts] = useState<AccountData[]>([]);

  useEffect(() => {
    const loadAccounts = async() => {
      const accountData = await getAccountList(userId, accountId);
      setAccounts(accountData);
    };
    loadAccounts();
  }, [userId, accountId]);

  return (
    <div>
    <div className="m-10">
        <h1 className="text-white">아래 계좌를 연결할게요</h1>
    </div>
    <div>
      {accounts.length > 0 ? (
          accounts.map((account) => (
            <div key={account.accountId}>
              <p>{account.accName} ({account.accountNum})</p>
            </div>
          ))
        ) : (
          <p className="text-white">계좌 정보가 없습니다.</p>
        )}
      </div>
    </div>
  );
}

export default LinkAccountPage;


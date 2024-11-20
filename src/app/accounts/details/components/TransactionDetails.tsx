import TransactionList from "./TransactionList";
import { useState, useEffect } from "react";
import { getTransactionByAccountId } from "@/api/TransactionApi";
import { UUID } from "crypto";
interface AccountData {
  accountId: number;
  accName : string;
  bankId : number;
  accountNum: string;
  balance: number;
}

interface TransactionData {
  transactionId: number;
  price: number;
  recipient: string;
  createdAt: Date;
  transactionType: string;
}
interface Props {
  accounts: AccountData[];
  userId: UUID;
  accountId: number;
}

const TransactionDetails: React.FC<Props> = ({ accounts, accountId,userId }) => {


  const [transactions, setTransactions] = useState<TransactionData[]>([]);

  useEffect(() => {
    const loadTransactions = async() => {
      const transactionData = await getTransactionByAccountId(userId, accountId);
      setTransactions(transactionData);
    };
    loadTransactions();
  }, []);

  return (
    <div className="text-white m-9">
      {accounts.map((account) => (
        <div key={account.accountId}>
          <h1 className="text-center mb-[60px]">{account.accName}</h1>
          <div className="mb-8">
            <p>하나은행 {account.accountNum}</p>
            <p className="text-[30px]">{account.balance}</p>
          </div>
          <hr/>
        </div>
      ))}
      <TransactionList transactions={transactions}/>
    </div>
  );
};

export default TransactionDetails;
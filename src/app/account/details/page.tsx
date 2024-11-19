import { useState, useEffect } from "react";
import TransactionDetails from "./components/TransactionDetails";
import { getAccountInfo } from "@/api/AccountApi";
import { UUID } from "crypto";

interface AccountData {
  accountId: number;
  accName : string;
  bankId : number;
  accountNum: string;
  balance: number;
}

interface DetailsProps {
  accountId: number;
  userId: UUID;
}

const AccountDetails: React.FC<DetailsProps> = ({ accountId, userId }) => {

  
  const [accounts, setAccounts] = useState<AccountData[]>([]);
  
  
  useEffect(() => {
    const loadAccount = async() => {
      const accountData = await getAccountInfo(userId,accountId);
      setAccounts(accountData);
    };
    loadAccount();
  }, []);



  return(
    <div>
      <TransactionDetails accounts={accounts} accountId={accountId} userId={userId}/>
    </div>
  )
}

export default AccountDetails;
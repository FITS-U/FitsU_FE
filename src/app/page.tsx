"use client"

import AccountLinkPage from "@/components/AccountLinkPage";
import { useParams } from "next/navigation";

const HomePage: React.FC = () => {
  const params = useParams();

  const accountId = params.accountId ? Number(params.accountId) : null;
  const userId = params.userId as string;

  return (
    <div>
      <AccountLinkPage accountId={Number(accountId)} userId={userId}/>
    </div>
  )
} 

export default HomePage;

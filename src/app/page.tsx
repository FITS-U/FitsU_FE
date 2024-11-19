"use client"

import AccountLinkPage from "@/components/AccountLinkPage";
import { useParams } from "next/navigation";

const HomePage: React.FC = () => {
  const params = useParams();

  const accountId = params.accountId ? Number(params.accountId) : null;
  const userId = params.userId as string;

  return (
    <div>
      <AccountLinkPage accountId={2} userId="9b1deb4d-3f7d-4bad-9bdd-2b0d7b3dcb6d"/>
    </div>
  )
} 

export default HomePage;

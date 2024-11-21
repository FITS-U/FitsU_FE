"use client"

import { useEffect, useState } from "react";
// import { useState } from "react";
import AfterLinkPage from "./components/AfterLink";
import BeforeLinkPage from "./components/BeforeLink";
import { getLinkedAccounts } from "@/api/AccountApi";
import { UUID } from "crypto";
import { Account } from "../types/account";

const HomePage: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const userId: UUID = "8b365953-d7ac-40f5-b57a-f975a8e3c9e5";

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const data = await getLinkedAccounts(userId);
        setAccounts(data);
      } catch (error) {
        console.error("Failed to fetch accout list:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      {accounts.length ? (
        <AfterLinkPage accounts={accounts} />
      ) : (
        <BeforeLinkPage />
      )}
    </div>
  )
}

export default HomePage;

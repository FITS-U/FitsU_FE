import { useMemo } from "react";
import { Transaction } from "@/types/account";
import { formatDateByDay } from "@/utils/formatDate";

export const groupTransactionsByDate = (transactions: Transaction[]) => {
  return useMemo(() => {
    return transactions.reduce((groups: Record<string, Transaction[]>, transaction) => {
      const date = formatDateByDay(transaction.createdAt);
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(transaction);
      return groups;
    }, {});
  }, [transactions]);
};

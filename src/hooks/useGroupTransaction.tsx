import { useMemo } from "react";
import { Transaction } from "@/types/account";
import { useFormatDateByDay } from "@/hooks/useFormatDate";

export const useGroupTransactionsByDate = (transactions: Transaction[]) => {
  return useMemo(() => {
    return transactions.reduce((groups: Record<string, Transaction[]>, transaction) => {
      const date = useFormatDateByDay(transaction.createdAt);
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(transaction);
      return groups;
    }, {});
  }, [transactions]);
};

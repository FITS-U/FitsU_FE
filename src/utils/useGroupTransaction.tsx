import { useMemo } from "react";
import { Transaction } from "@/types/transaction";
import { formatDateByDay, formatDateByDayName } from "@/utils/formatDate";

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

export const groupTransactionsByDayName = (transactions: Transaction[]) => {
  return useMemo(() => {
    return transactions.reduce((groups: Record<string, Transaction[]>, transaction) => {
      const date = formatDateByDayName(transaction.createdAt);
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(transaction);
      return groups;
    }, {});
  }, [transactions]);
};

import { create } from "zustand";
import { Transaction } from "@/types/account";

interface TransactionStore {
  transactions: Transaction[];
  selectedTransaction: Transaction;
  setTransactions: (
    transactions: Transaction[] | ((prev: Transaction[]) => Transaction[])
  ) => void;
  setSelectedTransaction: (selectedTransaction: Transaction) => void;
}

export const useTransactionStore = create<TransactionStore>((set) => ({
  transactions: [],
  selectedTransaction: {
    transactionId: 0,
    price: "",
    recipient: "",
    createdAt: "",
    accountId: 0,
    accName: "",
    categoryId: 0,
    categoryName: "",
    userCardId: null,
    cardName: null,
    transactionType: "",
  },
  setTransactions: (transactions) =>
    set((state) => ({
      transactions:
        typeof transactions === "function"
          ? transactions(state.transactions)
          : [...transactions],
    })),
  setSelectedTransaction: (selectedTransaction) => set({ selectedTransaction }),
}));

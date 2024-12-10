import { create } from "zustand";
import { Transaction } from "@/types/transaction";

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
    price: 0,
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

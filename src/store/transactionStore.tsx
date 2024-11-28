import { create } from "zustand";

export interface TransactionState {
  transactionId: number;
  price: string;
  recipient: string;
  createdAt: string;
  accountId: number;
  accName: string;
  categoryId: number;
  categoryName: string;
  userCardId: number | null;
  cardName: string | null;
  transactionType: string;
}

interface TransactionStore {
  transactions: TransactionState[];
  selectedTransaction: TransactionState;
  setTransactions: (transactions: TransactionState[]) => void;
  setSelectedTransaction: (selectedTransaction: TransactionState) => void;
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
  setTransactions: (transactions: any) => set({ transactions }),
  setSelectedTransaction: (selectedTransaction) => set({ selectedTransaction }),
}))
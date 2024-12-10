import { create } from "zustand";

export interface AccountState {
  accountId: number;
  accountNum: string;
  accName: string;
  balance: number;
  bankId: number;
  bankName: string;
  isLinked: boolean;
  imageUrl: string;
}

interface AccountStore {
  accounts: AccountState[];
  selectedAccount: AccountState;
  setAccounts: (accouts: AccountState[]) => void;
  setSelectedAccount: (selectedAccount: AccountState) => void;
  updateAccount: (updatedAccount: AccountState) => void;
}

export const useAccountStore = create<AccountStore>((set) => ({
  accounts: [],
  selectedAccount: {
    accountId: 0,
    accountNum: "",
    accName: "",
    balance: 0,
    bankId: 0,
    bankName: "",
    isLinked: true,
    imageUrl: "",
  },
  setAccounts: (accounts: any) => set({ accounts }),
  setSelectedAccount: (selectedAccount) => set({ selectedAccount }),
  updateAccount: (updatedAccount) =>
    set((state) => ({
      accounts: state.accounts.map((account) =>
        account.accountId === updatedAccount.accountId
          ? updatedAccount
          : account
      ),
    })),
}))


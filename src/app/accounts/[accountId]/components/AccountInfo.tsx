import { useAccountStore } from "@/store/accountStore";

export const AccountInfo = () => {
  const { selectedAccount } = useAccountStore();

  const formatBalance = (balance: string): string => {
    const balanceNumber = parseFloat(balance);
    return new Intl.NumberFormat('ko-KR').format(balanceNumber);
  };

  return (
    <div className="mt-20">
      <div className="text-sm tracking-tighter underline">{selectedAccount.accName} {selectedAccount.accountNum}</div>
      <div className="mt-1 text-3xl font-semibold">{formatBalance(selectedAccount.balance)}원</div>
    </div>
  );
}
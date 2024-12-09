import { useAccountStore } from "@/store/accountStore";
import { formatPrice } from "@/utils/formatPrice";

export const AccountInfo = () => {
  const { selectedAccount } = useAccountStore();

  return (
    <div className="mt-20">
      <div className="text-sm tracking-tighter underline">{selectedAccount.accName} {selectedAccount.accountNum}</div>
      <div className="mt-1 text-3xl font-semibold">{formatPrice(selectedAccount.balance)}원</div>
    </div>
  );
}
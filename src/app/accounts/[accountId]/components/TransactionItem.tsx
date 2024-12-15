import { CategoryIconsMini } from "@/icons/mapping";
import { useTransactionStore } from "@/store/transactionStore";
import { formatTime } from "@/utils/formatDate";
import { formatTransactionPrice } from "@/utils/formatPrice";

export const TransactionItem = () => {
  const { selectedTransaction } = useTransactionStore();

  return (
    <div className="mt-6 flex items-center justify-between">
      <div className="flex items-center">
        <div>
          {CategoryIconsMini[selectedTransaction.categoryName as keyof typeof CategoryIconsMini] || null}
        </div>
        <span className="ml-2 flex flex-col">
          <div className="text-lg font-semibold">{selectedTransaction.recipient}</div>
          <div className="mt-0.5 text-sm">{formatTime(selectedTransaction.createdAt)}</div>
        </span>
      </div>
      <span className="flex flex-col items-end">
        <div className="text-xl font-semibold">
          {formatTransactionPrice(selectedTransaction.price, selectedTransaction.transactionType)}원
        </div>
      </span>
    </div>
);
}
import { CategoryIconsMini } from "@/icons/mapping";
import { formatTime } from "@/utils/formatDate";
import { formatTransactionPrice } from "@/utils/formatPrice";

interface TransactionItemProps {
  categoryName: string;
  recipient: string;
  createdAt: string;
  price: number;
  transactionType: string;
}

export const TransactionItem = ({ categoryName, recipient, createdAt, price, transactionType } : TransactionItemProps) => {
  return (
    <div className="mt-4 mb-8 flex items-center justify-between">
      <div className="flex items-center">
        <div>
          {CategoryIconsMini[categoryName as keyof typeof CategoryIconsMini] || null}
        </div>
        <span className="ml-2 flex flex-col">
          <div className="text-lg font-semibold">{recipient}</div>
          <div className="mt-0.5 text-sm">{formatTime(createdAt)}</div>
        </span>
      </div>
      <span className="flex flex-col items-end">
        <div className="text-xl font-semibold">
          {formatTransactionPrice(price, transactionType)}원
        </div>
      </span>
    </div>
);
}
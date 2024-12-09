import { formatTransactionPrice } from "@/utils/formatPrice";

interface CtgTransItemProps {
  recipient: string;
  price: number;
  transactionType: string;
}

export const CtgTransItem = ({ recipient, price, transactionType } : CtgTransItemProps) => {
  return (
    <div className="mt-6 flex items-center justify-between">
      <span className="flex flex-col">
        <div className="text-lg font-semibold">{recipient}</div>
      </span>
      <span className="flex flex-col items-end">
        <div className="text-xl font-semibold">
          {formatTransactionPrice(price, transactionType)}원
        </div>
      </span>
    </div>
);
}
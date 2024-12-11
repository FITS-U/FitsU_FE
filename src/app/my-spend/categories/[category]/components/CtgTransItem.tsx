import { formatTransactionPrice } from "@/utils/formatPrice";

interface CtgTransItemProps {
  recipient: string;
  price: number;
  transactionType: string;
  method: string;
}

export const CtgTransItem = ({ recipient, price, transactionType, method } : CtgTransItemProps) => {
  return (
    <div className="mb-10">
      <div className="font-bold text-lg">{formatTransactionPrice(price, transactionType)}원</div>
      <div className="text-contrast-200 text-xs">{recipient} | {method}</div>
    </div>
);
}
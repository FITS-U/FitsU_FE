import { CategoryIconsMini } from "@/icons/mapping";
import { formatTransactionPrice } from "@/utils/formatPrice";

interface CtgTransItemProps {
  name: string;
  recipient: string;
  price: number;
  transactionType: string;
  method: string;
}

export const CtgTransItem = ({ name, recipient, price, transactionType, method } : CtgTransItemProps) => {
  return (
    <div className="flex items-center mb-8">
      <div>
        {CategoryIconsMini[name as keyof typeof CategoryIconsMini] || null}
      </div>
      <div className="ml-2">
        <div className="font-bold text-lg">{formatTransactionPrice(price, transactionType)}원</div>
        <div className="text-contrast-200 text-xs">{recipient} | {method}</div>
      </div>
    </div>
);
}
import { TransactionState } from "@/store/transactionStore";

interface TransactionItemProps {
  transaction: TransactionState;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  function formatTime(dateString:string) {
    const date = new Date(dateString);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${hours}:${minutes}`;
  }

  function formatPrice(price:string, type:string) {
    const priceNum = parseFloat(price);
    const formattedPrice = new Intl.NumberFormat('ko-KR').format(priceNum);

    return type === "expense" ? `-${formattedPrice}` : formattedPrice;
  }

  return (
    <div className="mt-6 flex items-center justify-between">
      <span className="flex flex-col">
        <div className="text-lg font-semibold">{transaction.recipient}</div>
        <div className="mt-0.5 text-sm">{formatTime(transaction.createdAt)}</div>
      </span>
      <span className="flex flex-col items-end">
        <div className="text-xl font-semibold">
          {formatPrice(transaction.price, transaction.transactionType)}원
        </div>
        {/* <div className="mt-0.5 text-sm">1,276,380원</div> */}
      </span>
    </div>
);
}
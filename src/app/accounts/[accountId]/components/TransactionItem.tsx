interface TransactionItemProps {
  recipient: string;
  time: string;
  price: string;
}

export const TransactionItem = ({ recipient, time, price}:TransactionItemProps) => {
  return (
    <div className="mt-6 flex items-center justify-between">
      <span className="flex flex-col">
        <div className="text-lg font-semibold">{recipient}</div>
        <div className="mt-0.5 text-sm">{time}</div>
      </span>
      <span className="flex flex-col items-end">
        <div className="text-xl font-semibold">{price}</div>
        {/* <div className="mt-0.5 text-sm">1,276,380원</div> */}
      </span>
    </div>
);
}
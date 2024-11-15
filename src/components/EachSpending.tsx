interface EachSpendingProps {
  price: string;
  receipent: string;
  payMethodName: string;
}

const EachSpending = ({price, receipent, payMethodName}: EachSpendingProps) => {
  return (
    <div className="mb-5">
      <div className="font-bold text-lg">{price}원</div>
      <div className="text-xs">{receipent} | {payMethodName}</div>
    </div>
  );
};

export default EachSpending;
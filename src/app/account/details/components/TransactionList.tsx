
interface TransactionData {
  transactionId: number;
  price: number;
  recipient: string;
  createdAt: Date;
  transactionType: string;
}

interface Props {
  transactions: TransactionData[];
}

const TransactionList: React.FC<Props> = ({transactions}) => {


  return(
    <div className="mt-4">
        {transactions.map((transaction) => {
          const date = new Date(transaction.createdAt)
          const formattedDate = date.toLocaleDateString();
          const formattedTime = date.toLocaleTimeString();

        return(
          <div key={transaction.transactionId}>
          <p className="text-xs">{formattedDate}</p>
          <div className="flex justify-between items-center">
          <p className="font-bold text-[18px]">{transaction.recipient}</p>
          <p>{transaction.price}원</p>
          </div>
          <p className="text-gray-400 text-sm">{formattedTime}</p>
          </div>
        );
        })}
        
    </div>
  )
}

export default TransactionList;
import Link from "next/link";
import { TransactionItem } from "./TransactionItem"
import { useParams } from "next/navigation";
import { Transaction } from "@/types/account";

interface TransactionsProps {
  transactions: Transaction[];
}

export const Transactions: React.FC<TransactionsProps> = ({ transactions }) => {
  const { accountId } = useParams();

  function formatDate(dateString:string) {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = String(date.getHours()).padStart(2, '0'); // 시를 2자리로 맞추기
    const minutes = String(date.getMinutes()).padStart(2, '0'); // 분을 2자리로 맞추기

    return [`${month}월 ${day}일`, `${hours}:${minutes}`];
  }

  function formatPrice(price:string, type:string) {
    const priceNum = parseFloat(price);
    const formattedPrice = new Intl.NumberFormat('ko-KR').format(priceNum);

    return type === "expense" ? `-${formattedPrice}` : formattedPrice;
  }

  // 날짜별로 거래 내역을 그룹화
  const groupedTransactions = transactions.reduce((groups: Record<string, Transaction[]>, transaction) => {
    const [date] = formatDate(transaction.createdAt);
    console.log(date);
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(transaction);
    return groups;
  }, {});

  return (
    <div className="mt-8">
      {Object.entries(groupedTransactions).map(([date, transactions]) => (
        <div key={date}>
          <div className="text-sm font-bold mb-2">{date}</div>
          {transactions.map((transaction, index) => {
            const [, formattedTime] = formatDate(transaction.createdAt);
            return (
              <Link
                key={index}
                href={`/accounts/${accountId}/transactions/${index + 1}`}
              >
                <TransactionItem
                  recipient={transaction.recipient}
                  time={formattedTime}
                  price={formatPrice(transaction.price, transaction.transactionType)}
                />
              </Link>
            );
          })}
        </div>
      ))}
    </div>
  );
}
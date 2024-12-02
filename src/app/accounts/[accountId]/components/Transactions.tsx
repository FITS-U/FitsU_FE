import Link from "next/link";
import { TransactionItem } from "./TransactionItem"
import { useParams } from "next/navigation";
import { Transaction } from "@/types/account";
import { useTransactionStore } from "@/store/transactionStore";
import { useFormatDateToMonthly } from "@/hooks/useFormatDate";

export const Transactions = () => {
  const { accountId } = useParams();
  const { transactions, setSelectedTransaction } = useTransactionStore();

  // 날짜별로 거래 내역을 그룹화
  const groupedTransactions = transactions.reduce((groups: Record<string, Transaction[]>, transaction) => {
    const date = useFormatDateToMonthly(transaction.createdAt);
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
          {transactions.map((transaction, index) => (
            <Link
              key={index}
              href={`/accounts/${accountId}/transactions/${index + 1}`}
              onClick={() => setSelectedTransaction(transaction)}
            >
              <TransactionItem transaction={transaction} />
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
}
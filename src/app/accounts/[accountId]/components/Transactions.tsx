import Link from "next/link";
import { TransactionItem } from "./TransactionItem"
import { useParams } from "next/navigation";
import { useTransactionStore } from "@/store/transactionStore";
import { groupTransactionsByDate } from "@/utils/useGroupTransaction";

export const Transactions = () => {
  const { accountId } = useParams();
  const { transactions, setSelectedTransaction } = useTransactionStore();

  // 그룹화된 거래 내역 가져오기
  const groupedTransactions = groupTransactionsByDate(transactions);

  return (
    <div className="mt-8">
      {Object.entries(groupedTransactions).map(([date, transactions]) => (
        <div key={date}>
          <div className="text-sm mt-10">{date}</div>
          {transactions.map((transaction, index) => (
            <Link
              key={index}
              href={`/accounts/${accountId}/transactions/${index + 1}`}
              onClick={() => setSelectedTransaction(transaction)}
            >
              <TransactionItem
                categoryName={transaction.categoryName}
                createdAt={transaction.createdAt}
                price={transaction.price}
                recipient={transaction.recipient}
                transactionType={transaction.transactionType}
              />
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
}
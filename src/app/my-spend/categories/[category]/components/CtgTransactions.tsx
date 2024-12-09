import { useTransactionStore } from "@/store/transactionStore";
import { groupTransactionsByDayName } from "@/utils/useGroupTransaction";
import { CtgTransItem } from "./CtgTransItem";

export const CtgTransactions = () => {
  const { transactions } = useTransactionStore();

  // 그룹화된 거래 내역 가져오기
  const groupedTransactions = groupTransactionsByDayName(transactions);

  return (
    <div className="mt-8">
      {Object.entries(groupedTransactions).map(([date, transactions]) => (
        <div key={date}>
          <div className="text-sm font-bold mb-2">{date}</div>
          {transactions.map((transaction, index) => (
            <div key={index}>
              <CtgTransItem 
                recipient={transaction.recipient}
                price={transaction.price}
                transactionType={transaction.transactionType}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
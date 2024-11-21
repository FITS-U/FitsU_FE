import Link from "next/link";
import { TransactionItem } from "./TransactionItem"
import { useParams } from "next/navigation";

export const Transactions = () => {
  const { accountId } = useParams();
  const transactionId = 1;

  return (
    <div className="mt-8">
      <div className="text-sm">11월 22일</div>
      <Link href={`/accounts/${accountId}/transactions/${transactionId}`}>
        <TransactionItem />
      </Link>
    </div>
  );
}
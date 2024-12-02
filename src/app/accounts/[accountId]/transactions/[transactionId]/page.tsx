"use client"

import { formatFullDate } from "@/utils/formatDate";
import { formatTransactionPrice } from "@/utils/formatPrice";
import { useTransactionStore } from "@/store/transactionStore";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const TransactionItemDetail = () => {
  const { accountId, transactionId } = useParams();
  const { selectedTransaction } = useTransactionStore();

  return (
    <div className="p-8 text-white">
      <div className="flex items-center justify-between">
        <Link href={`/accounts/${accountId}`}>
          <FaChevronLeft className="h-5" />
        </Link>
        <span className="tracking-tighter">상세 내역</span>
        <div></div>
      </div>
      <div className="mt-10">
        <div>{selectedTransaction.recipient}</div>
        <div className="text-3xl font-semibold tracking-wider">
          {formatTransactionPrice(selectedTransaction.price, selectedTransaction.transactionType)}
        </div>
      </div>
      <div className="mt-16 flex items-center justify-between">
        <span>카테고리 설정</span>
        <Link href={`/accounts/${accountId}/transactions/${transactionId}/edit-category`}>
          <span className="flex items-center justify-between">
            <span className="mr-2 text-orange-500">{selectedTransaction.categoryName}</span>
            <FaChevronRight className="h-3" />
          </span>
        </Link>
      </div>
      <div className="mt-8 flex items-center justify-between">
        <span>결제수단</span>
        {selectedTransaction.cardName !== null
          ? <span>{selectedTransaction.cardName}</span>
          : <span>{selectedTransaction.accName}</span>
        }
      </div>
      <div className="mt-8 flex items-center justify-between">
        <span>결제일시</span>
        <span>{formatFullDate(selectedTransaction.createdAt)}</span>
      </div>
      <div className="mt-8 flex items-center justify-between">
        <span>입금처</span>
        <span>{selectedTransaction.recipient}</span>
      </div>
    </div>
  );
}

export default TransactionItemDetail;
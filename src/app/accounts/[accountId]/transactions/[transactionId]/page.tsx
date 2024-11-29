"use client"

import { useTransactionStore } from "@/store/transactionStore";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const TransactionItemDetail = () => {
  const { accountId, transactionId } = useParams();
  const { selectedTransaction } = useTransactionStore();

  function formatDate(dateString:string) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}년 ${month}월 ${day}일 ${hours}:${minutes}`;
  }

  function formatPrice(price:string, type:string) {
    const priceNum = parseFloat(price);
    const formattedPrice = new Intl.NumberFormat('ko-KR').format(priceNum);

    return type === "expense" ? `-${formattedPrice}` : formattedPrice;
  }

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
          {formatPrice(selectedTransaction.price, selectedTransaction.transactionType)}
        </div>
      </div>
      <div className="mt-16 flex items-center justify-between">
        <span>카테고리 설정</span>
        <Link href={`/accounts/${accountId}/transactions/${transactionId}/edit-category`}>
          <span className="flex items-center justify-between">
            <span className="mr-2 text-main-color">{selectedTransaction.categoryName}</span>
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
        <span>{formatDate(selectedTransaction.createdAt)}</span>
      </div>
      <div className="mt-8 flex items-center justify-between">
        <span>입금처</span>
        <span>{selectedTransaction.recipient}</span>
      </div>
    </div>
  );
}

export default TransactionItemDetail;
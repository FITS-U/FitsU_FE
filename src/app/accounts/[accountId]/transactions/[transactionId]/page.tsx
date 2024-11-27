"use client"

import Link from "next/link";
import { useParams } from "next/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const TransactionItemDetail = () => {
  const { accountId, transactionId } = useParams();

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
        <div>이디야</div>
        <div className="text-3xl font-semibold tracking-wider">-3,400원</div>
      </div>
      <div className="mt-16 flex items-center justify-between">
        <span>카테고리 설정</span>
        <Link href={`/accounts/${accountId}/transactions/${transactionId}/edit-category`}>
          <span className="flex items-center justify-between">
            <span className="mr-2 text-main-color">카페/베이커리</span>
            <FaChevronRight className="h-3" />
          </span>
        </Link>
      </div>
      <div className="mt-8 flex items-center justify-between">
        <span>결제수단</span>
        <span>K-패스 하나 체크카드</span>
      </div>
      <div className="mt-8 flex items-center justify-between">
        <span>결제일시</span>
        <span>2024년 11월 10일 13:10</span>
      </div>
      <div className="mt-8 flex items-center justify-between">
        <span>입금처</span>
        <span>이디야커피가정고점</span>
      </div>
    </div>
  );
}

export default TransactionItemDetail;
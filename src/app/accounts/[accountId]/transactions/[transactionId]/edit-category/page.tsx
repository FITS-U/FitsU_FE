"use client"

import Link from "next/link";
import { useParams } from "next/navigation";
import { FaChevronLeft } from "react-icons/fa";

const EditCategory = () => {
  const { accountId, transactionId } = useParams();

  return (
    <div className="p-8 text-white">
      <Link href={`/accounts/${accountId}/transactions/${transactionId}`}>
        <FaChevronLeft />
      </Link>
      <div>카테고리 수정 페이지</div>
    </div>
  );
}

export default EditCategory;
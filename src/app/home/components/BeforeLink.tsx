import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";

const BeforeLinkPage = () => {
  return (
    <div className="p-8 text-white">
      <Link href="/accounts">
        <div className="w-full h-16 p-6 font-bold bg-box-color rounded-2xl flex items-center justify-between">
          <span>내 계좌 연결하기</span>
          <FaChevronRight className="text-sm"/>
        </div>
      </Link>
    </div>
  );
};

export default BeforeLinkPage;
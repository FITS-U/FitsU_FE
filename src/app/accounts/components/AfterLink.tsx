import { Account } from "@/types/account";
import Link from "next/link";

interface AfterLinkPageProps {
  accounts: Account[];
  month: number;
  monthlySpend: string;
}

const AfterLinkPage: React.FC<AfterLinkPageProps> = ({ accounts, month, monthlySpend }) => {
  // 천 단위 구분 함수
  const formatBalance = (balance: string): string => {
    const balanceNumber = parseFloat(balance); // balance를 number로 변환
    return new Intl.NumberFormat('ko-KR').format(balanceNumber);
  };

  return (
    <div className="p-6 text-white">
      <div className="mb-10 bg-box-color h-auto rounded-2xl p-4">
        {accounts.map((account) => (
          <div key={account.accountId}>
            <div className="flex justify-between items-center mb-5">
              <span>
                <div className="text-xl font-bold">{formatBalance(account.balance)}원</div>
                <div className="text-sm">{account.accName}</div>
              </span>
              <Link href={`/accounts/`}>
                <button className="bg-[#333230] rounded-lg w-14 h-8 text-sm">내역</button>
              </Link>
            </div>
          </div>
        ))}
        <hr className="mb-4"/>
        <Link href="/banks">
          <div className="text-center text-sm cursor-pointer">다른 계좌 연결하기</div>
        </Link>
      </div>
      <div className="bg-box-color rounded-2xl p-4 flex items-center justify-between">
        <span>
          <div className="text-xl font-bold">{formatBalance(monthlySpend)}원</div>
          <div className="text-sm">{month}월에 쓴 돈</div>
        </span>
        <Link href="/my-spend">
          <button className="bg-[#333230] rounded-lg w-14 h-8 text-sm">내역</button>
        </Link>
      </div>
    </div>
  );
};

export default AfterLinkPage;
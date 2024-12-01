import { useFormatPrice } from "@/hooks/useFormatPrice";
import { AccountState, useAccountStore } from "@/store/accountStore";
import { useMonthlyStore } from "@/store/monthlyStore";
import Link from "next/link";

interface AfterLinkPageProps {
  accounts: AccountState[];
}

const AfterLinkPage: React.FC<AfterLinkPageProps> = ({ accounts }) => {
  const { setSelectedAccount } = useAccountStore();
  const { month, monthlySpend } = useMonthlyStore();
  const {} = useFormatPrice(monthlySpend);

  const handleAccountClick = (account: AccountState) => {
    setSelectedAccount(account);
  };

  return (
    <div className="p-6 text-white">
      <div className="mb-10 bg-contrast-800 h-auto rounded-2xl p-4">
        {accounts.map((account, index) => (
          <div key={index}>
            <div className="flex justify-between items-center mb-5">
              <span>
                <div className="text-xl font-bold">{useFormatPrice(account.balance)}원</div>
                <div className="text-sm">{account.accName}</div>
              </span>
              <Link href={`/accounts/${index + 1}`}>
                <button
                  onClick={() => handleAccountClick(account)}
                  className="bg-[#333230] rounded-lg w-14 h-8 text-sm"
                >
                  내역
                </button>
              </Link>
            </div>
          </div>
        ))}
        <hr className="mb-4"/>
        <Link href="/banks">
          <div className="text-center text-sm cursor-pointer">다른 계좌 연결하기</div>
        </Link>
      </div>
      <div className="bg-contrast-800 rounded-2xl p-4 flex items-center justify-between">
        <span>
          <div className="text-xl font-bold">{useFormatPrice(monthlySpend)}원</div>
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
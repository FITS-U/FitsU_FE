import { formatPrice } from "@/utils/formatPrice";
import { AccountState, useAccountStore } from "@/store/accountStore";
import { useMonthlyStore } from "@/store/monthlyStore";
import Link from "next/link";

interface AfterLinkPageProps {
  accounts: AccountState[];
}

const AfterLinkPage: React.FC<AfterLinkPageProps> = ({ accounts }) => {
  const { setSelectedAccount } = useAccountStore();
  const { monthlySpends, currentMonth, currentYear } = useMonthlyStore();

  const mapping = monthlySpends.map((mthSpend, index) => {
    if (mthSpend.year === currentYear && mthSpend.month === currentMonth) {
      
    }
  })

  const handleAccountClick = (account: AccountState) => {
    setSelectedAccount(account);
  };

  return (
    <div className="overflow-y-auto scrollbar-hide max-h-[calc(100vh-170px)]">
      <div className="mb-10 bg-contrast-800 h-auto rounded-2xl p-4">
        {accounts.map((account, index) => (
          <div key={index}>
            <div className="flex justify-between items-center mb-5">
              <span>
                <div className="text-xl font-bold">{formatPrice(account.balance)}원</div>
                <div className="text-sm">{account.accName}</div>
              </span>
              <Link href={`/accounts/${index + 1}`}>
                <button
                  onClick={() => handleAccountClick(account)}
                  className="bg-contrast-600 rounded-lg w-14 h-8 text-sm"
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
        {monthlySpends.map((monthly, index) => (
          <div key={index}>
            <span>
              {monthly.year === currentYear && monthly.month === currentMonth && (
                <div>
                  <div className="text-xl font-bold">{formatPrice(monthly.spend)}원</div>
                  <div className="text-sm">{monthly.month}월에 쓴 돈</div>
                </div>
              )}
            </span>
          </div>
        ))}
        <Link href="/my-spend">
          <button className="bg-contrast-600 rounded-lg w-14 h-8 text-sm">내역</button>
        </Link>
      </div>
    </div>
  );
};

export default AfterLinkPage;
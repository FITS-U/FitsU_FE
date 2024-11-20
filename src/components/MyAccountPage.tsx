import Link from "next/link";


interface AccountData {
  accountId: number;
  userId: string;
  balance: number;
  accName: string;
}

interface MyAccountPageProps {
  accounts: AccountData[];
}

const MyAccountPage: React.FC<MyAccountPageProps> = ({ accounts }) => {

  return (
    <div className="text-white m-20">
    {accounts.map((account) => (
      <div key={account.accountId} className="mb-10 bg-[#1C1B18] h-auto rounded-lg p-3">
        <div>
          <p className="flex justify-between items-center">
          {account.balance}원<br />
          {account.accName}
          <Link href="/account/details">
          <button className="bg-[#333230] w-[52px] h-[32px]">내역</button>
          </Link>
          </p>
          <hr className="mt-2 mb-2"/>
          <p className="text-center">다른 계좌 연결하기</p>
        </div>
      </div>
      ))
    }
      <div className="bg-[#1C1B18] rounded-lg p-3">
        <p className="flex justify-between items-center">
          213,000원<br/>
          11월에 쓴 돈
          <button className="bg-[#333230] w-[52px] h-[32px]">내역</button>
        </p>
      </div>
    </div>
  )
}

export default MyAccountPage;
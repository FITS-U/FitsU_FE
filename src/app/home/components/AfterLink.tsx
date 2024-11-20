import Link from "next/link";

const AfterLinkPage = () => {
  // 임의의 계좌 데이터
  const accounts = [
    { accountId: 1, userId: "user1", balance: 500000, accName: "주거래 하나 통장" },
    { accountId: 2, userId: "user2", balance: 1200000, accName: "쏠편한 입출금 통장" },
    { accountId: 3, userId: "user3", balance: 450000, accName: "우리 SUPER 주거래 통장" },
  ];

  const totalPrice = 213000;

  // 천 단위 구분 함수
  const formatBalance = (balance: number): string => {
    return new Intl.NumberFormat('ko-KR').format(balance);
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
              <Link href="/accounts/details">
                <button className="bg-[#333230] rounded-lg w-14 h-8 text-sm">내역</button>
              </Link>
            </div>
          </div>
        ))}
        <hr className="mb-4"/>
        <p className="text-center text-sm">다른 계좌 연결하기</p>
      </div>
      <div className="bg-box-color rounded-2xl p-4 flex items-center justify-between">
        <span>
          <div className="text-xl font-bold">{formatBalance(totalPrice)}원</div>
          <div className="text-sm">11월에 쓴 돈</div>
        </span>
        <Link href="/my-spend">
          <button className="bg-[#333230] rounded-lg w-14 h-8 text-sm">내역</button>
        </Link>
      </div>
    </div>
  );
};

export default AfterLinkPage;
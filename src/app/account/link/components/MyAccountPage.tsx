const MyAccountPage = () => {
  return (
    <div className="text-white m-20">
    <div className="mb-10 bg-[#1C1B18] rounded-lg p-3">
      <p>
        900,000원<br />
        주거래 하나 통장
        <button className="bg-[#333230] w-[52px] h-[32px]">내역</button>
        <hr className="mt-2 mb-2"/>
        <p className="text-center">다른 계좌 연결하기</p>
      </p>
    </div>
    <div className="bg-[#1C1B18] rounded-lg p-3">
      <p>
        213,000원<br/>
        11월에 쓴 돈
        <button className="bg-[#333230] w-[52px] h-[32px]">내역</button>
      </p>
    </div>
    </div>
  )
}

export default MyAccountPage;
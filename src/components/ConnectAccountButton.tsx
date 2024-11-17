import Link from "next/link";

const ConnectAccountButton
 = () => {

  return (
  
  <div className="m-4">
    <Link href="/account">
      <button className="text-white font-bold bg-[#1C1B18] min-w-[360px] min-h-[76px] rounded-lg">내 계좌 연결하기
      </button>
    </Link>
  </div>

  )
}

export default ConnectAccountButton;
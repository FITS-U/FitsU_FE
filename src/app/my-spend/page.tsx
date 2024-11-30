// import { v4 as uuidv4 } from "uuid";
import DailySpending from "@/components/DailySpending";
import TopSpendingCategory from "./components/TopSpendingCategory";
import Link from "next/link";

type UUID = string;

interface Transaction {
  payId: number;
  price: number;
  recipient: string;
  createdAt: string;
  accountId: number;
  categoryId: number;
  userCardId: string | null;
}

// 임시 UUID 기본값 생성
// const TEMP_USER_ID: UUID = uuidv4();
const TEMP_USER_ID = "b7d6237a-a640-11ef-8a92-00155d15297e";

// UUID 정규식 검증 함수
// function isValidUUID(uuid: string): boolean {
//   const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
//   return UUID_REGEX.test(uuid);
// }

// API 호출 함수
async function fetchTransactions(userId: UUID): Promise<Transaction[]> {
  const res = await fetch(`http://localhost:8084/api/v1/transaction/users/${userId}`, {
    cache: "no-store", // 항상 최신 데이터를 가져옴
  });
  console.log(res)
  if (!res.ok) {
    console.error("Failed to fetch transactions");
    return [];
  }

  return res.json();
}

export default async function MySpendPage({ params }: { params: { userId?: UUID } }) {
  // userId가 없는 경우 기본값 사용 또는 유효성 검증
  const userId = params.userId ? params.userId : TEMP_USER_ID;

  // API로부터 트랜잭션 데이터 가져오기
  const transactions = await fetchTransactions(userId);

  // 총 소비 금액 계산
  const totalSpend = transactions.reduce((sum, transaction) => sum + transaction.price, 0);

  // 카테고리 데이터를 임시로 하드코딩 (예: 가장 많이 소비된 카테고리)
  const topCategoryName = "식비"; // 예시 카테고리 이름
  const topCategoryIconSrc = "/icons/food.png"; // 예시 아이콘 경로

  return (
    <div className="text-white p-8">
      {/* 월 소비 정보 */}
      <div className="font-semibold">11월</div>
      <div className="text-2xl font-semibold">{totalSpend.toLocaleString()}원</div>

      {/* 카테고리 링크 */}
      <Link href="/my-spend/categories">
        <TopSpendingCategory name={topCategoryName} iconSrc={topCategoryIconSrc} />
      </Link>

      {/* 일별 소비 데이터 */}
      {transactions.map((transaction) => (
        <DailySpending
          key={transaction.payId}
          date={new Date(transaction.createdAt).getDate()} // 날짜 계산
          dayName={new Intl.DateTimeFormat("ko-KR", { weekday: "long" }).format(
            new Date(transaction.createdAt)
          )} // 요일 계산
        />
      ))}
    </div>
  );
}

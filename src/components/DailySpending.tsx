import EachSpending from "./EachSpending";

interface DailySpendingProps {
  date: string;
  dayName: string;
}

const DailySpending = ({date, dayName}: DailySpendingProps) => {
  return (
    <section className="mt-8">
      <div className="mb-4 text-xs">{date}일 {dayName}</div>
      <EachSpending price="-9,000" receipent="깐부치킨 충정로역점" payMethodName="토스뱅크 오렌지밀크" />
      <EachSpending price="-4,600" receipent="신한체크교통" payMethodName="내 신한계좌" />
      <EachSpending price="-1,000" receipent="메가커피" payMethodName="토스뱅크 오렌지밀크" />
    </section>
  );
}

export default DailySpending;
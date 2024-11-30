import CategoryLogo from "@/components/CategoryLogo";
import EachSpending from "@/components/EachSpending";

const ShoppingPage = () => {
  const totlaAmount = "40,300원";
  const spending = [
    { date: "4일 월요일", amount: "-30,000", receipent: "깐부치킨 충정로역점", payMethod: "토스뱅크 오렌지밀크" },
    { date: "3일 일요일", amount: "-20,000", receipent: "루이스웨딩", payMethod: "토스뱅크 오렌지밀크" },
  ];
  const count = spending.length;

  return (
    <div>
      <div className="flex items-center justify-between mt-24">
        <span>
          <div className="text-sm mb-2">11월 쇼핑 총 금액</div>
          <div className="text-3xl font-semibold">{totlaAmount}</div>
        </span>
        <CategoryLogo w={60} h={60} name="쇼핑" iconSrc="/icons/shopping.png" />
      </div>
      <div className="mt-8 bg-contrast-800 rounded-2xl p-2 w-[64px] text-sm flex items-center justify-center">
        <p>총 {count}회</p>
      </div>
      <div className="mt-8 mx-[-32px] flex bg-contrast-800 h-4"></div>
      <section className="mt-8">
        {spending.map((spending, index) => (
          <div key={index}>
            <div className="mb-4 text-xs">{spending.date}</div>
            <EachSpending
              price={spending.amount}
              receipent={spending.receipent}
              payMethodName={spending.payMethod}
            />
          </div>
        ))}
      </section>
    </div>
  );
};

export default ShoppingPage;
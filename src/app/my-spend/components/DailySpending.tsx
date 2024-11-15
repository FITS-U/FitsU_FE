import EachSpend from "./EachSpend";

const DailySpending = () => {
  return (
    <section className="mt-8">
      <div className="mb-4 text-xs">15일 금요일</div>
      <EachSpend/>
      <EachSpend/>
      <EachSpend/>
    </section>
  );
}

export default DailySpending;
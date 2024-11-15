import EachSpending from "./EachSpending";

const DailySpending = () => {
  return (
    <section className="mt-8">
      <div className="mb-4 text-xs">15일 금요일</div>
      <EachSpending/>
      <EachSpending/>
      <EachSpending/>
    </section>
  );
}

export default DailySpending;
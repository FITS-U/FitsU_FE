export const TransactionItem = () => {
  return (
    <div className="mt-6 flex items-center justify-between">
      <span className="flex flex-col">
        <div className="text-lg font-semibold">이디야커피가정고</div>
        <div className="mt-0.5 text-sm">13:10</div>
      </span>
      <span className="flex flex-col items-end">
        <div className="text-xl font-semibold">-3,400원</div>
        <div className="mt-0.5 text-sm">1,276,380원</div>
      </span>
    </div>
);
}
const TransactionDetails = () => {
  return (
    <div className="text-white m-9">
      <h1 className="text-center mb-[60px]">주거래 하나 통장</h1>
      <div className="mb-8">
        <p>하나은행 382471093847198</p>
        <p className="text-[30px]">1,276,380원</p>
      </div>
      <hr/>
      <div className="mt-4">
        <p className="text-xs">11월 10일</p>
        <div className="flex justify-between items-center">
        <p className="font-bold text-[18px]">지에스25</p>
        <p>-3400원</p>
        </div>
        <p className="text-gray-400 text-sm">17:50</p>
      </div>
    </div>
  )
}

export default TransactionDetails;
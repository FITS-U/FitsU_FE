export const useFormatPrice = (price: string) => {
  const priceNumber = parseFloat(price);
  return new Intl.NumberFormat('ko-KR').format(priceNumber);
};

export const useFormatTransactionPrice = (price:string, type:string) => {
  const priceNum = parseFloat(price);
  const formattedPrice = new Intl.NumberFormat('ko-KR').format(priceNum);

  return type === "expense" ? `-${formattedPrice}` : formattedPrice;
}
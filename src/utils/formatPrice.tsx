export const formatPrice = (price: string) => {
  const priceNumber = parseFloat(price);
  return new Intl.NumberFormat('ko-KR').format(priceNumber);
};

export const formatTransactionPrice = (price:string, type:string) => {
  const priceNum = parseFloat(price);
  const formattedPrice = new Intl.NumberFormat('ko-KR').format(priceNum);

  return type === "expense" ? `-${formattedPrice}` : formattedPrice;
}

export const formatCalenderPrice = (price: number): string => {
  return price.toLocaleString('ko-KR');
};
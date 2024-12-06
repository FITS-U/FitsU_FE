export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('ko-KR').format(price);
};

export const formatTransactionPrice = (price:number, type:string) => {
  const formattedPrice = new Intl.NumberFormat('ko-KR').format(price);
  return type === "expense" ? `-${formattedPrice}` : formattedPrice;
}

export const formatCalenderPrice = (price: number): string => {
  return price.toLocaleString('ko-KR');
};
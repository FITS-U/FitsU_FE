export const useFormatPrice = (price: string) => {
  const priceNumber = parseFloat(price);
  return new Intl.NumberFormat('ko-KR').format(priceNumber);
};
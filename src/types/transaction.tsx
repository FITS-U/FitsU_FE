export interface Transaction {
  transactionId: number;
  price: number;
  recipient: string;
  createdAt: string;
  accountId: number;
  accName: string;
  categoryId: number;
  categoryName: string;
  userCardId: number | null;
  cardName: string | null;
  transactionType: string;
}
export interface Account {
  accountId: number;
  accountNum: string;
  accName: string;
  balance: string;  // 또는 double로 지정
  bankId: number;
  bankName: string;
  isLinked: boolean;
}
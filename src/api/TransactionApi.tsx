import axios from "axios";
import { UUID } from "crypto";

export const getTransactionByAccountId = async(userId:UUID, accountId:number) => {
  const {data} = await axios({
    method: "GET",
    url: `http://localhost:8084/api/v1/users/${userId}/accounts/${accountId}`
  });
  return data;
}

export const getMonthlySpend = async(userId:UUID, year:number, month:number) => {
  const {data} = await axios ({
    method: "GET",
    url: `http://localhost:8084/api/v1/transactions/mth-spend/users/${userId}?year=${year}&month=${month}`
  });
  return data;
}
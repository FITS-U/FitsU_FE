import axios from "axios";
import { UUID } from "crypto";

export const getTransactionByAccountId = async(userId:UUID, accountId:number) => {
  const {data} = await axios({
    method: "GET",
    url: `http://localhost:8084/api/v1/users/${userId}/accounts/${accountId}`
  });
  return data;
}

export const getMonthSpend = async(userId:UUID) => {
  const {data} = await axios ({
    method: "GET",
    url: `http://localhost:8084/api/v1/mth-spend/users/${userId}`
  });
  return data;
}
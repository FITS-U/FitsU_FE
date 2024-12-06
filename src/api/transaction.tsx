import axios from "axios";
import { IP } from "./account";

export const getTransactionByAccountId = async(token:string|null, accountId:number|undefined) => {
  const {data} = await axios({
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    },
    url: `http://${IP}:8084/api/v1/transactions/accounts/${accountId}`
  });
  return data;
}

export const getMonthlySpend = async(token:string|null, year:number, month:number) => {
  const {data} = await axios ({
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    },
    url: `http://${IP}:8084/api/v1/transactions/mth-spend?year=${year}&month=${month}`
  });
  return data;
}

export const getMonthlyTransactions = async (token:string|null, year:number, month:number) => {
  const {data} = await axios ({
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    },
    url: `http://${IP}:8084/api/v1/transactions/monthly?year=${year}&month=${month}`
  });
  return data;
}

export const getMthlySpendOfCtg = async (token:string|null, year:number, month:number) => {
  const {data} = await axios ({
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    },
    url: `http://${IP}:8084/api/v1/transactions/mth-expenses-by-category?year=${year}&month=${month}`
  });
  return data;
}
import axios from "axios";

export const getTransactionByAccountId = async(token:string|null, accountId:number) => {
  const {data} = await axios({
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    },
    url: `http://192.168.1.33:8084/api/v1/users/transactions/accounts/${accountId}`
  });
  return data;
}

export const getMonthlySpend = async(token:string|null, year:number, month:number) => {
  const {data} = await axios ({
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    },
    url: `http://192.168.1.33:8084/api/v1/transactions/mth-spend?year=${year}&month=${month}`
  });
  return data;
}
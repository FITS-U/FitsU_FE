import axios from "axios";
import { UUID } from "crypto";

export const getBankList = async() => {
  const {data} = await axios({
    method: "GET",
    url: `http://localhost:8081/api/v1/banks`
  });
  return data;
}

export const getAccountInfo  = async(userId:UUID,accountId:number) => {
  const {data} = await axios({
    method: "GET",
    url: `http://localhost:8081/api/v1/users/${userId}/accounts/${accountId}`
  });
  return data;
}

export const getLinkedStatus = async(accountId:number, userId:UUID) => {
  const {data} = await axios({
    method: "GET",
    url: `http://localhost:8081/api/v1/accounts/${accountId}/check-linked?userId=${userId}`
  });
  return data;
}
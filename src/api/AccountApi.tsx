import axios from "axios";

export const getBankList = async() => {
  const {data} = await axios({
    method: "GET",
    url: `http://localhost:8081/api/v1/banks`
  });
  return data;
}

export const getAccountList  = async(userId:string, accountId:number) => {
  const {data} = await axios({
    method: "GET",
    url: `http://localhost:8081/api/v1/users/${userId}/accounts/${accountId}`
  });
  return data;
}

export const getLinkedStatus = async(accountId:number, userId:string) => {
  const {data} = await axios({
    method: "GET",
    url: `http://localhost:8081/api/v1/accounts/${accountId}/check-linked?userId=${userId}`
  });
  return data;
}
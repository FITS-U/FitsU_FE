import axios from "axios";
import { UUID } from "crypto";

export const getBankList = async() => {
  const {data} = await axios({
    method: "GET",
    url: `http://localhost:8081/api/v1/banks`
  });
  return data;
}

export const getLinkedAccounts = async(userId:UUID) => {
  const {data} = await axios({
    method: "GET",
    url: `http://localhost:8081/api/v1/accounts/linked/users/${userId}`
  });
  return data;
}
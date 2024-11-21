import axios from "axios";
import qs from "qs";
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

export const getUnlinkedAccounts = async (
  userId: UUID,
  bankIds: number[]
) => {
  const { data } = await axios({
    method: "GET",
    url: `http://localhost:8081/api/v1/accounts/unlinked/users/${userId}`,
    params: { bankId: bankIds },
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: "repeat" });
    },
  });
  return data;
};

export const updateLinkStatus = async(body:[]) => {
  const {data} = await axios({
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    url: `http://localhost:8081/api/v1/accounts`
  });
  return data;
}
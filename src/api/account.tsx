import axios from "axios";

export const getBankList = async() => {
  const {data} = await axios({
    method: "GET",
    url: `http://192.168.1.33:8087/api/v1/banks`
  });
  return data;
}

export const getLinkedAccounts = async(token:string|null) => {
  const {data} = await axios({
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    },
    url: `http://192.168.1.33:8087/api/v1/accounts/linked`
  });
  return data;
}

export const getUnlinkedAccounts = async (token:string|null, bankIds: number[]) => {
  const { data } = await axios({
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    },
    url: `http://192.168.1.33:8087/api/v1/accounts/unlinked`,
    params: {
      bankIds: bankIds.join(","), // bankIds=1,2
    },
  });
  return data;
};

export const updateLinkStatus = async(token:string|null, bankIds:number[]) => {
  const body = {
    bankIds
  };
  
  const {data} = await axios({
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    data: body,
    url: `http://192.168.1.33:8087/api/v1/accounts`
  });
  return data;
}
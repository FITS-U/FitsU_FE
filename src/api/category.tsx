import axios from "axios";

export const getCategories = async() => {
  const {data} = await axios({
    method: "GET",
    url: `http://192.168.1.33:8082/api/v1/cards/categories`
  });
  return data;
}


export const saveInterestCtg = async(categoryIds:number[], token:string) => {
  const body = {
    categoryIds
  }
  await axios({
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: body,
    url: `http://192.168.1.33:8085/api/v1/interest-category`
  });
}
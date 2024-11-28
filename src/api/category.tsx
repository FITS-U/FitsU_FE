import axios from "axios";
import { IP } from "./account";

export const getCategories = async() => {
  const {data} = await axios({
    method: "GET",
    url: `http://${IP}:8082/api/v1/cards/categories`
  });
  return data;
}


export const saveInterestCtg = async(categoryIds:number[], token:string|null) => {
  const body = {
    categoryIds
  }
  await axios({
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: body,
    url: `http://${IP}:8085/api/v1/interest-category`
  });
}
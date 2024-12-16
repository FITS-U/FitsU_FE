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


export const saveLogDatas = async(categoryId:number, eventType:string, token:string|null) => {
  const body = {
    categoryId,
    eventType
  }
  await axios({
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: body,
    url: `http://${IP}:8088/api/v1/logs`
  });
}


export const editCategory = async(token: string|null, transactionId:number, categoryId:number, categoryName:string) => {
  const body = {
    categoryId,
    categoryName
  }
  await axios({
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: body,
    url: `http://${IP}:8084/api/v1/transactions/${transactionId}`
  });
}
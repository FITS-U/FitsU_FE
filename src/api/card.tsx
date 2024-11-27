import axios from "axios";

export const getCategories = async() => {
  const {data} = await axios({
    method: "GET",
    url: `http://192.168.1.33:8082/api/v1/cards/categories`
  });
  return data;
}
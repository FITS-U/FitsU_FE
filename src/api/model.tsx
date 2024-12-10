import axios from "axios";
import { IP } from "./account";

export const getAdModelData = async(token:string|null) => {
  const {data} = await axios({
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    },
    url: `http://${IP}:8091/api/v1/advertisement`
  });
  return data;
}
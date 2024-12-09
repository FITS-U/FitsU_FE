import axios from "axios";
import { IP } from "./account";

export const getAllCards = async() => {
  const {data} = await axios({
    method: "GET",
    url: `http://${IP}:8082/api/v1/cards`
  });
  return data;
}
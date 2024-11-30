import axios from "axios";
import { IP } from "./account";

// 인증번호 확인
export const verifyCode = async(phoneNum: string, code:string) => {
  const body = {
    phoneNum,
    code
  };
  
  const {data} = await axios({
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    url: `http://${IP}:8080/api/v1/auth/verify-code`
  });
  return data;
}

// 로그인 유효성 확인
export const isValidLogin = async(userName:string, phoneNum: string, token:string|null) => {
  const body = {
    userName,
    phoneNum
  };
  
  const {data} = await axios({
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    data: body,
    withCredentials: true,
    url: `http://${IP}:8080/api/v1/auth/login`
  });
  return data;
}

// 회원가입
export const Register = async(userName:string, RRNum:string, phoneNum:string, nickName:string, token:string|null) => {
  const body = {
    userName,
    RRNum,
    phoneNum,
    nickName
  };
  
  const {data} = await axios({
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    data: body,
    withCredentials: true,
    url: `http://${IP}:8080/api/v1/auth/register`
  });
  return data;
}
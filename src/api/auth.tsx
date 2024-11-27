import axios from "axios";

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
    url: `http://localhost:8080/api/v1/auth/verify-code`
  });
  return data;
}

// 로그인 유효성 확인
export const isValidLogin = async(userName:string, phoneNum: string, token:string) => {
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
    url: `http://localhost:8080/api/v1/auth/login`
  });
  return data;
}

// 회원가입
export const Register = async(userName:string, RRNum:string, phoneNum:string, nickName:string, token:string) => {
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
    url: `http://192.168.1.33:8080/api/v1/auth/register`
  });
  return data;
}
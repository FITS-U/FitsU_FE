"use client"

import { verifyCode } from "@/api/auth";
import { TitleType, useAuthStore } from "@/store/authStore";
import { ChangeEvent, KeyboardEvent } from "react";

interface AuthProps {
  text: string;
}

// 로그인 또는 회원가입 선택 버튼 컴포넌트
export const AuthBtn = ({ text }: AuthProps) => {
  return (
    <button className="border-2 border-current w-full h-16 text-xl text-main-color font-bold rounded-xl">
      {text}
    </button>
  );
}

// 로그인-회원가입 단계별 설명 컴포넌트
export const AuthDescription = ({ text }: AuthProps) => {
  return (
    <div className="mt-20 text-2xl font-bold h-28">
      {text}
    </div>
  );
}


export interface AuthInputProps { text:string; title:TitleType; maxLen:number; onNext?:()=>void; }
// input 버튼 컴포넌트
export const AuthInput = ({ text, title, maxLen, onNext } : AuthInputProps) => {
  const { user, setUser, setVerificationStatus } = useAuthStore();

  const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    // 한글, 영문, 숫자만 허용
    const filteredValue = value.replace(/[^ㄱ-힣a-zA-Z0-9]/g, "");
    setUser({ ...user, [title]: filteredValue });
  }

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      if (onNext) onNext();
    }
  };

  const verifyNum = async () => {
    try {
      const data = await verifyCode(user.phoneNum, user.verifyNum);
      setUser({ ...user, token:data });
      setVerificationStatus(true);
    } catch (error) {
      console.error("Failed to validation code:", error);
      alert("인증번호가 올바르지 않습니다.");
    } finally {
      alert("번호 인증에 성공했습니다.");
    }
  };

  return (
    <div className="flex items-center">
      <div className="w-full flex flex-col text-main-color">
        <div className="font-semibold mb-4">{text}</div>
        <div className="relative">
          <input
            type="text"
            placeholder={text}
            maxLength={maxLen}
            value={user[title]}
            onChange={onChangeHandler}
            onKeyDown={onKeyDownHandler}
            className="w-full h-14 p-3 border border-current rounded-lg bg-black focus:outline-none focus:ring-0 placeholder:text-main-color"
          />
          {title == "verifyNum" && (
            <button
              onClick={verifyNum}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-main-color text-black px-4 py-2 rounded-lg font-bold"
            >
              확인
            </button>
          )}
        </div>
      </div>
    </div>
  );
};


export interface AuthBtnProps { onNext?:()=>void; title:TitleType; }
// 하단에 고정되어 있는 버튼 컴포넌트
export const AuthFixedBtn = ({ onNext, title } :AuthBtnProps ) => {
  const { user, isVerified } = useAuthStore();
  const isDisabled =
    title === "verifyNum"
      ? !isVerified
      : (user[title] || "").trim() === "";

  const handleClick = () => {
    if (isDisabled) return;
    if (onNext) onNext();
  };

  return (
    <div className="absolute block bottom-4 w-full -left-0">
      <div className="px-6">
        <button
          className={`p-4 w-full x-2 font-bold text-black text-lg rounded-2xl ${
            isDisabled ? "bg-gray-500" : "bg-main-color"
          }`}
          disabled={isDisabled}
          onClick={handleClick}
        >
          확인
        </button>
      </div>
    </div>
  );
};

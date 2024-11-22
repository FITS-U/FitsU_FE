"use client"

import { useState } from "react";
import LoginInput, { LoginInputProps } from "./components/LoginInput";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

const LoginPage = () => {
  const { user } = useAuthStore();
  const [step, setStep] = useState(0);
  const router = useRouter();

  const LoginInputList: LoginInputProps[] = [
    {
      inputText: "이름",
      descText: "이름을 입력해주세요.",
      onNext: () => setStep(1),
      title:"name",
      maxLen: 6,
      text:""
    },
    {
      inputText: "휴대폰번호",
      descText: "휴대폰 번호를 입력해주세요.",
      onNext: () => setStep(2),
      title:"phoneNum",
      maxLen: 11,
      text:""
    },
    {
      inputText: "인증번호",
      descText: "인증번호를 입력해주세요.",
      onNext: () => {
        const isVerified = true; // 인증 번호 검증 api 연동 필요
        if (isVerified) {
          router.push("/accounts");
          console.log(user);  // user 객체 임시로 확인
        } else {
          alert("인증번호가 올바르지 않습니다.");
        }
      },
      title:"varifyNum",
      maxLen: 6,
      text:"",
    },
  ];

  return (
    <div className="p-8 text-white h-screen relative overflow-hidden">
      <LoginInput {...LoginInputList[step]} />
    </div>
  );
}

export default LoginPage;
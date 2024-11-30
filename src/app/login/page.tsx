"use client"

import { useState } from "react";
import LoginInput, { LoginInputProps } from "./components/LoginInput";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { isValidLogin } from "@/api/auth";
import { LogoToRoot } from "@/components/Logo";

const LoginPage = () => {
  const { user, setUser } = useAuthStore();
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
      onNext: async () => {
        try {
          const data = await isValidLogin(user.name, user.phoneNum, user.token);
          setUser({...user, token: data});
          router.push("/accounts");
        } catch (error) {
          console.error("Failed to validation code:", error);
          alert("로그인에 실패했습니다.");
          window.location.reload();
        }
      },
      title:"verifyNum",
      maxLen: 6,
      text:"",
    },
  ];

  return (
    <div className="p-8 text-white h-screen relative overflow-hidden">
      <LogoToRoot />
      <LoginInput {...LoginInputList[step]} />
    </div>
  );
}

export default LoginPage;
"use client"

import { useSignupStore } from "@/store/signupStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SignupInput, { SignupInputProps } from "../login/components/SignupInput";

const RegisterPage = () => {
  const { newUser } = useSignupStore();
  const [step, setStep] = useState(0);
  const router = useRouter();

  const SignupInputList: SignupInputProps[] = [
    {
      title: "name",
      descText: "이름을 입력해주세요.",
      inputText: "이름",
      onNext: () => setStep(1),
      maxLen: 6,
      text: ""
    },
    {
      title: "phoneNum",
      descText: "휴대폰 번호를 입력해주세요.",
      inputText: "휴대폰 번호",
      onNext: () => setStep(2),
      maxLen: 11,
      text: ""
    },
  ]

  return (
    <div className="p-8 text-white h-screen relative overflow-hidden">
      <SignupInput {...SignupInputList[step]} />
    </div>
  );
}

export default RegisterPage;